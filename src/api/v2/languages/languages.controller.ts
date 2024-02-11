import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LanguagesService } from './languages.service';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import QueryPaginationDto from 'src/dto/query-pagination.dto';
import UpdateBulkLanguageDto from './dto/update-bulk-language.dto';
import DeleteBulkLanguageDto from './dto/delete-bulk-language.dto';
import { CreateBulkLanguageDto } from './dto/create-bulk-language.dto';

@ApiTags('api|v2|languages')
@Controller('/api/v2/languages')
export class LanguagesController {
  constructor(private readonly languagesService: LanguagesService) {}

  @Post()
  createBulk(@Res() res, @Body() dto: CreateBulkLanguageDto) {
    return this.languagesService.createBulk(res, dto);
  }

  @Post('new')
  create(@Res() res, @Body() createLanguageDto: CreateLanguageDto) {
    return this.languagesService.create(res, createLanguageDto);
  }

  @Get()
  findAll(@Res() res, @Query() query: QueryPaginationDto) {
    return this.languagesService.findAll(res, query);
  }

  @Get(':id')
  findOne(@Res() res, @Param('id') id: string) {
    return this.languagesService.findOne(res, +id);
  }

  @Patch()
  updateBulk(@Res() res, @Body() dto: UpdateBulkLanguageDto) {
    return this.languagesService.updateBulk(res, dto);
  }

  @Patch(':id')
  update(@Res() res, @Param('id') id: string, @Body() dto: UpdateLanguageDto) {
    return this.languagesService.update(res, +id, dto);
  }

  @Delete()
  removeBulk(@Res() res, @Body() dto: DeleteBulkLanguageDto) {
    return this.languagesService.removeBulk(res, dto);
  }

  @Delete(':id')
  remove(@Res() res, @Param('id') id: string) {
    return this.languagesService.remove(res, +id);
  }
}
