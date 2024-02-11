import { Injectable } from '@nestjs/common';
import { CreateSeoPageDto } from './dto/create-seo-page.dto';
import { UpdateSeoPageDto } from './dto/update-seo-page.dto';

@Injectable()
export class SeoPagesService {
  create(createSeoPageDto: CreateSeoPageDto) {
    return 'This action adds a new seoPage';
  }

  findAll() {
    return `This action returns all seoPages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} seoPage`;
  }

  update(id: number, updateSeoPageDto: UpdateSeoPageDto) {
    return `This action updates a #${id} seoPage`;
  }

  remove(id: number) {
    return `This action removes a #${id} seoPage`;
  }
}
