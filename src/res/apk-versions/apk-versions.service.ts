import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ApkVersionEntity } from './entities/apk-version.entity';

@Injectable()
export class ApkVersionsService {
  constructor(
    @InjectRepository(ApkVersionEntity)
    private readonly apkVersionEntity: Repository<ApkVersionEntity>,
  ) {}

  async findLast() {
    const [candidate] = await this.apkVersionEntity.find({
      order: { dp_date: 'DESC' },
      take: 1,
    });
    return candidate;
  }
}
