import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { V2Module } from './api/v2/v2.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV
        ? `${process.env.NODE_ENV}.env`
        : '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: process.env.APP__DB_HOST,
      port: Number(process.env.APP__DB_PORT),
      username: process.env.APP__DB_USER,
      password: process.env.APP__DB_PASS,
      database: process.env.APP__DB_NAME,
      entities: [path.join('dist', '**', '*.entity.js')],
      logging: true,
      ...(process.env.NODE_ENV !== 'dev' ? { logger: 'file' } : {}),
      synchronize: false,
    }),
    V2Module,
  ],
})
export class AppModule {}
