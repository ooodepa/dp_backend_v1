import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SeoPagesService } from './seo-pages.service';
import { CreateSeoPageDto } from './dto/create-seo-page.dto';
import { UpdateSeoPageDto } from './dto/update-seo-page.dto';

@ApiTags('api|v2|seo-pages')
@Controller('/api/v2/seo-pages')
export class SeoPagesController {
  constructor(private readonly seoPagesService: SeoPagesService) {}

  @Post()
  create(@Body() createSeoPageDto: CreateSeoPageDto) {
    return this.seoPagesService.create(createSeoPageDto);
  }

  @Get()
  findAll() {
    return this.seoPagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seoPagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeoPageDto: UpdateSeoPageDto) {
    return this.seoPagesService.update(+id, updateSeoPageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seoPagesService.remove(+id);
  }
}
