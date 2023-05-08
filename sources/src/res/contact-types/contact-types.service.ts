import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import HttpResponse from 'src/utils/HttpResponseDto/HttpResponse';
import { ContactTypeEntity } from './entities/contact-type.entity';
import { CreateContactTypeDto } from './dto/create-contact-type.dto';
import { UpdateContactTypeDto } from './dto/update-contact-type.dto';

@Injectable()
export class ContactTypesService {
  constructor(
    @InjectRepository(ContactTypeEntity)
    private readonly contactTypeEntity: Repository<ContactTypeEntity>,
  ) {}

  async create(dto: CreateContactTypeDto) {
    await this.contactTypeEntity.save(dto);
    return HttpResponse.successCreate();
  }

  async createBulk(array: CreateContactTypeDto[]) {
    await this.contactTypeEntity.insert(array);
    return HttpResponse.successBulkCreate();
  }

  async findAll() {
    return await this.contactTypeEntity.find({
      order: { dp_name: 'ASC' },
    });
  }

  async findOne(id: number) {
    return await this.contactTypeEntity.findOneOrFail({ where: { dp_id: id } });
  }

  async update(id: number, dto: UpdateContactTypeDto) {
    await this.contactTypeEntity.findOneOrFail({ where: { dp_id: id } });
    await this.contactTypeEntity.update(id, dto);
    return HttpResponse.successUpdate();
  }

  async remove(id: number) {
    await this.contactTypeEntity.findOneOrFail({ where: { dp_id: id } });
    await this.contactTypeEntity.delete(id);
    return HttpResponse.successDeleted();
  }
}
