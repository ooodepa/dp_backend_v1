import * as bcrypt from 'bcryptjs';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Raw, Repository } from 'typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangeEmailDto } from './dto/change-email.dto';
import { ChangePasswordDto } from './dto/change-password';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ChangeEmailEntity } from './entities/change-email.entity';
import CreateUserResponseDto from './dto/create-user-response.dto';
import { SessionEntity } from '../sessions/entities/session.entity';
import TokenPayloadDto from 'src/utils/TokenPayloadDto/token-payload.dto';
import { ActivationAccountEntity } from './entities/activation-account.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
    @InjectRepository(ActivationAccountEntity)
    private readonly activationAccountEntity: Repository<ActivationAccountEntity>,
    @InjectRepository(ChangeEmailEntity)
    private readonly ChangeEmailEntity: Repository<ChangeEmailEntity>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
    req,
  ): Promise<CreateUserResponseDto> {
    const { dp_login, dp_email, dp_password } = createUserDto;

    const ip = `${
      req?.headers['x-forwarded-for'] || req?.connection.remoteAddress
    }`;

    const agent = `${req?.headers['user-agent']}`;

    const loginCandidate = await this.userEntity.findOne({
      where: { dp_login },
    });

    if (loginCandidate) {
      const message = 'Логин занят другим пользоватем';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    const emailCandidate = await this.userEntity.findOne({
      where: { dp_email },
    });

    if (emailCandidate) {
      const message = 'E-mail занят другим пользоватем';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    const str = dp_password;
    const salt = 5;
    createUserDto.dp_passwordHash = await bcrypt.hash(str, salt);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = await queryRunner.manager
        .getRepository(UserEntity)
        .save(createUserDto);

      const userId = user.dp_id;

      const activationToken = await this.generateToken({
        id: userId,
        type: 'activation',
      });
      const accessToken = await this.generateToken({
        id: userId,
        type: 'access',
      });
      const refreshToken = await this.generateToken({
        id: userId,
        type: 'refresh',
      });

      await queryRunner.manager.getRepository(ActivationAccountEntity).save({
        dp_token: activationToken,
        dp_userId: userId,
      });

      await queryRunner.manager.getRepository(SessionEntity).save({
        dp_accessToken: accessToken,
        dp_refreshToken: refreshToken,
        dp_agent: agent,
        dp_ip: ip,
        dp_userId: userId,
      });

      const sendMailOptions: ISendMailOptions = {
        to: dp_email,
        subject: 'Подтверждение учетной записи',
        template: 'confirmation',
        context: {
          dp_url: `${process.env.APP__SWAGGER_HOST}/api/v1/users/activate-account/${activationToken}`,
          dp_org: process.env.APP__SWAGGER_ORGANIZATION,
        },
      };

      try {
        await this.mailerService.sendMail(sendMailOptions);
      } catch (err) {
        const message = `Сообщение об подтвержении аккаунта не отправлено на почту err=(${err})`;
        throw new Error(message);
      }

      await queryRunner.commitTransaction();

      return {
        statusCode: 201,
        message: 'Пользователь зарегистрирован',
        dp_accessToken: accessToken,
        dp_refreshToken: refreshToken,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const message = `Транзакция не совершена err=(${err})`;
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(message, status);
    } finally {
      await queryRunner.release();
    }
  }

  async findOne(req: Request) {
    const payload = await this.getAccessTokenFromRequest(req);
    return this.userEntity.findOneOrFail({
      select: [
        'dp_id',
        'dp_unp',
        'dp_nameLegalEntity',
        'dp_shortNameLegalEntity',
        'dp_address',
      ],
      where: { dp_id: payload.id },
    });
  }

  async activateAccount(dp_token: string) {
    try {
      await this.verifyToken(dp_token, 'activation');
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const message = `Ссылка не действительна, так как прошло 24 часа err=(${err})`;
        const status = HttpStatus.NOT_FOUND;
        throw new HttpException(message, status);
      }
      const message = `Ссылка не действительна, так как токен подделан err=(${err})`;
      const status = HttpStatus.NOT_FOUND;
      throw new HttpException(message, status);
    }

    const candidate = await this.activationAccountEntity.findOne({
      where: { dp_token },
    });

    if (!candidate) {
      const message =
        'Ссылка не действительная, так как такой токен не зарегстрирован в БД';
      const status = HttpStatus.NOT_FOUND;
      throw new HttpException(message, status);
    }

    if (candidate.dp_isActivated) {
      const message =
        'Ссылка не действительная, так как аккаунт уже активирован';
      const status = HttpStatus.NOT_FOUND;
      throw new HttpException(message, status);
    }

    this.activationAccountEntity.update(candidate.dp_id, {
      dp_isActivated: true,
    });

    const message = 'Аккаунт активирован';
    const status = HttpStatus.OK;
    throw new HttpException(message, status);
  }

  @Cron('0 * * * *') // At minute 0 (00:00, 01:00, 02:00, .. 22:00, 23:00)
  async deleteUnactivatedAccounts() {
    console.log(
      ` > ${new Date().toJSON()}: Запущен CRON по удалению пользователей, которые не нажали ссылку активации за 24 часа`,
    );

    const candidates = await this.activationAccountEntity.find({
      select: ['dp_userId'],
      where: {
        dp_date: Raw(
          (alias) => `${alias} <= DATE_SUB(NOW(), INTERVAL 24 HOUR)`,
        ),
        dp_isActivated: false,
      },
    });

    if (candidates.length == 0) return;

    const ids = candidates.map((e) => e.dp_userId);
    if (ids.length == 0) return;

    await this.userEntity.delete({
      dp_id: In(ids),
    });
  }

  async updateEmail(changeEmailDto: ChangeEmailDto, req) {
    const payload = await this.getAccessTokenFromRequest(req);
    const userId = payload.id;

    const user = await this.userEntity.findOne({ where: { dp_id: userId } });
    const old_email = user.dp_email;
    const new_email = changeEmailDto.dp_email;

    if (old_email == new_email) {
      const message = 'Новая почта совпадает с текущей';
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    const candidate = await this.ChangeEmailEntity.findOne({
      where: {
        dp_userId: userId,
      },
    });

    if (!candidate.dp_isClosed) {
      let message =
        'Cлишком много запросов о смене электроной почты за не прошедшие 3 часа.';
      message += 'Отмените заявку по ссылке на старой почте. ';
      const status = HttpStatus.TOO_MANY_REQUESTS;
      throw new HttpException(message, status);
    }

    const newEmailToken = await this.generateToken({
      id: userId,
      type: 'new-email',
    });

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.getRepository(ChangeEmailEntity).save({
        dp_oldEmail: old_email,
        dp_newEmail: new_email,
        dp_token: newEmailToken,
        dp_userId: userId,
      });

      const newEmail_sendMailOptions: ISendMailOptions = {
        to: new_email,
        subject: 'Уведомление о смене электронной почты',
        template: 'new-email',
        context: {
          dp_url_confirm_change_email: `${process.env.APP__SWAGGER_HOST}/api/v1/users/change-email/${newEmailToken}/confirm`,
          dp_org: process.env.APP__SWAGGER_ORGANIZATION,
        },
      };

      try {
        await this.mailerService.sendMail(newEmail_sendMailOptions);
      } catch (err) {
        const message = `Уведомление о смене почты не отправлено на новую почту: ${err}`;
        throw new Error(message);
      }

      const oldEmail_sendMailOptions: ISendMailOptions = {
        to: old_email,
        subject: 'Уведомление о смене электронной почты',
        template: 'old-email',
        context: {
          dp_newEmail: new_email,
          dp_url_delete_change_email: `${process.env.APP__SWAGGER_HOST}/api/v1/users/change-email/${newEmailToken}/delete`,
          dp_org: process.env.APP__SWAGGER_ORGANIZATION,
        },
      };

      try {
        await this.mailerService.sendMail(oldEmail_sendMailOptions);
      } catch (err) {
        const message = `Уведомление о смене почты не отправлено на старую почту: ${err}`;
        throw new Error(message);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const message = `Транзакция не совершена err=(${err})`;
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(message, status);
    } finally {
      await queryRunner.release();
    }

    const message =
      'Заявка отправлена на новую почту и предупреждение отправлено на старую почту';
    const status = HttpStatus.OK;
    throw new HttpException(message, status);
  }

  async confirmChangeEmail(token) {
    let payload: any = {};
    try {
      payload = await this.verifyToken(token, 'new-email');
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const message = `Ссылка не действительна, так как прошло 3 часа (токен просрочен) err=(${err})`;
        const status = HttpStatus.NOT_FOUND;
        throw new HttpException(message, status);
      }

      const message = `Ссылка не действительна, так как токен подделан (токен не прошел валидацию) err=(${err})`;
      const status = HttpStatus.NOT_FOUND;
      throw new HttpException(message, status);
    }

    const userId = payload.id;

    const candidate = await this.ChangeEmailEntity.findOne({
      where: {
        dp_token: token,
        dp_userId: userId,
      },
    });

    if (!candidate) {
      const message = `Токена не зарегистрирован в БД`;
      const status = HttpStatus.UNAUTHORIZED;
      throw new HttpException(message, status);
    }

    if (candidate.dp_isClosed) {
      const message =
        'Ссылка не действительна, так как почта была сменена, либо заявка на смену почты была отклонена';
      const status = HttpStatus.UNAUTHORIZED;
      throw new HttpException(message, status);
    }

    const old_email = candidate.dp_oldEmail;
    const new_email = candidate.dp_newEmail;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .getRepository(ChangeEmailEntity)
        .update(candidate.dp_id, {
          dp_isClosed: true,
        });

      await queryRunner.manager.getRepository(UserEntity).update(userId, {
        dp_email: new_email,
      });

      await queryRunner.commitTransaction();

      const message =
        `Электронная почта <a href="mailto:${old_email}">${old_email}</a> ` +
        `изменена на <a href="mailto:${new_email}">${new_email}</a>`;
      const status = HttpStatus.OK;
      throw new HttpException(message, status);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const message = `Транзакция не совершена err=${err}`;
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(message, status);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteChangeEmail(token) {
    try {
      await this.verifyToken(token, 'new-email');
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const message = `Ссылка не действительна, так как прошло 3 часа (токен просрочен) err=(${err})`;
        const status = HttpStatus.NOT_FOUND;
        throw new HttpException(message, status);
      }

      const message = `Ссылка не действительна, так как токен подделан (токен не прошел валидацию) err=(${err})`;
      const status = HttpStatus.NOT_FOUND;
      throw new HttpException(message, status);
    }

    const candidate = await this.ChangeEmailEntity.findOne({
      where: {
        dp_token: token,
      },
    });

    if (!candidate) {
      const message =
        'Ссылка не действительна, так как токен не зарегистрирован в БД';
      const status = HttpStatus.NOT_FOUND;
      throw new HttpException(message, status);
    }

    if (candidate.dp_isClosed) {
      const message =
        'Ссылка не действительна, так как почта была сменена, либо заявка на смену почты была отклонена';
      const status = HttpStatus.UNAUTHORIZED;
      throw new HttpException(message, status);
    }

    await this.ChangeEmailEntity.delete({
      dp_token: token,
    });

    const message = 'Заявка на смену электронной почты отменена';
    const status = HttpStatus.OK;
    throw new HttpException(message, status);
  }

  async forgetPassword(forgetPasswordDto: ForgetPasswordDto) {
    const candidate = await this.userEntity.findOne({
      where: [
        { dp_email: forgetPasswordDto.emailOrLogin },
        { dp_login: forgetPasswordDto.emailOrLogin },
      ],
    });

    if (!candidate) {
      const message = `Пользователь с такими данными не существует`;
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    const randomString: string = await bcrypt.hash(new Date().toJSON(), 5);
    const newPasswordStr = randomString.slice(10, 26);
    const newPasswordSalt = 5;
    const newPasswordHash = await bcrypt.hash(newPasswordStr, newPasswordSalt);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .getRepository(UserEntity)
        .update(candidate.dp_id, {
          dp_passwordHash: newPasswordHash,
        });

      const sendMailOptions: ISendMailOptions = {
        to: candidate.dp_email,
        subject: 'Восстановление пароля',
        template: 'forget-password-email',
        context: {
          dp_login: candidate.dp_login,
          dp_password: newPasswordStr,
          dp_org: process.env.APP__SWAGGER_ORGANIZATION,
        },
      };

      try {
        await this.mailerService.sendMail(sendMailOptions);
      } catch (err) {
        const message = `Письмо с логином и новым сгенерированным паролем не отправлено на почту: ${err}`;
        throw new Error(message);
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const message = `Транзакция не выполнена err=(${err})`;
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(message, status);
    } finally {
      await queryRunner.release();
    }

    const message =
      'На электронную почту отправлен логин и новый сгенерированный пароль';
    const status = HttpStatus.OK;
    throw new HttpException(message, status);
  }

  async updatePassword(changePasswordDto: ChangePasswordDto, req) {
    const payload = await this.getAccessTokenFromRequest(req);
    const userId = payload.id;

    const candidate = await this.userEntity.findOne({
      where: {
        dp_id: userId,
      },
    });

    const password = changePasswordDto.dp_oldPassword;
    const hash = candidate.dp_passwordHash;
    const isVerifyPassword = await bcrypt.compare(password, hash);

    if (!isVerifyPassword) {
      const message = `Не тот старый пароль`;
      const status = HttpStatus.CONFLICT;
      throw new HttpException(message, status);
    }

    const newPasswordStr = changePasswordDto.dp_newPassword;
    const newPasswordSalt = 5;
    const newPasswordHash = await bcrypt.hash(newPasswordStr, newPasswordSalt);

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.getRepository(UserEntity).update(userId, {
        dp_passwordHash: newPasswordHash,
      });

      await queryRunner.manager
        .getRepository(SessionEntity)
        .delete({ dp_userId: userId });

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      const message = `Транзакция не выполнена err=(${err})`;
      const status = HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(message, status);
    } finally {
      await queryRunner.release();
    }
    const message = 'Пароль изменен';
    const status = HttpStatus.OK;
    throw new HttpException(message, status);
  }

  async generateToken(dto: TokenPayloadDto) {
    const payload: TokenPayloadDto = {
      type: dto.type,
      id: dto.id,
    };

    let options: JwtSignOptions;

    switch (payload.type) {
      case 'refresh':
        options = {
          secret: process.env.APP__JWT_SECRET_REFRESH,
          expiresIn: process.env.APP__JWT_EXPIRE_REFRESH,
        };
        break;
      case 'access':
        options = {
          secret: process.env.APP__JWT_SECRET_ACCESS,
          expiresIn: process.env.APP__JWT_EXPIRE_ACCESS,
        };
        break;
      case 'activation':
        options = {
          secret: process.env.APP__JWT_SECRET_ACTIVATION,
          expiresIn: process.env.APP__JWT_EXPIRE_ACTIVATION,
        };
        break;
      case 'new-email':
        options = {
          secret: process.env.APP__JWT_SECRET_NEW_EMAIL,
          expiresIn: process.env.APP__JWT_EXPIRE_NEW_EMAIL,
        };
        break;
    }

    const token = await this.jwtService.sign(payload, options);
    return token;
  }

  async verifyToken(
    token: string,
    tokenType: 'access' | 'refresh' | 'activation' | 'new-email',
  ): Promise<TokenPayloadDto> {
    let options: JwtVerifyOptions = {};

    switch (tokenType) {
      case 'refresh':
        options = {
          secret: process.env.APP__JWT_SECRET_REFRESH,
        };
        break;
      case 'access':
        options = {
          secret: process.env.APP__JWT_SECRET_ACCESS,
        };
        break;
      case 'activation':
        options = {
          secret: process.env.APP__JWT_SECRET_ACTIVATION,
        };
        break;
      case 'new-email':
        options = {
          secret: process.env.APP__JWT_SECRET_NEW_EMAIL,
        };
        break;
    }

    let payload: any = {};
    try {
      payload = await this.jwtService.verify(token, options);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        const message = 'Токен просрочен';
        const status = HttpStatus.UNAUTHORIZED;
        throw new HttpException(message, status);
      }
    }

    const PAYLOAD: TokenPayloadDto = payload;
    if (PAYLOAD.type !== tokenType) {
      const message = `Токен не имеет тип ${tokenType}`;
      const status = HttpStatus.UNAUTHORIZED;
      throw new HttpException(message, status);
    }

    return PAYLOAD;
  }

  getBearerToken(req: Request): string {
    const reqHeaders: any = req.headers;
    const authHeader: string = reqHeaders.authorization;

    const bearer = authHeader?.split(' ')[0];
    const token = authHeader?.split(' ')[1];

    if (bearer != 'Bearer' || !token) {
      const message = 'Bearer токен не передан';
      const status = HttpStatus.UNAUTHORIZED;
      throw new HttpException(message, status);
    }

    return token;
  }

  async getAccessTokenFromRequest(req: Request): Promise<TokenPayloadDto> {
    const token = this.getBearerToken(req);
    const payload = await this.verifyToken(token, 'access');
    return payload;
  }

  async getRefreshTokenFromRequest(req: Request): Promise<TokenPayloadDto> {
    const token = this.getBearerToken(req);
    const payload = await this.verifyToken(token, 'refresh');
    return payload;
  }
}
