import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ContactTypesService } from './contact-types.service';
import { GetContactTypeDto } from './dto/get-contact-type.dto';
import { CreateContactTypeDto } from './dto/create-contact-type.dto';
import { UpdateContactTypeDto } from './dto/update-contact-type.dto';
import SwaggerApiResponse from 'src/utils/Swagger/SwaggerApiResponse';
import SwaggerApiOperation from 'src/utils/Swagger/SwaggerApiOperation';
import { IsAdministratorGuard } from 'src/guards/IsAdministratorGuard.guard';
import { CreateBulkContactTypeDto } from './dto/create-bulk-contact-type.dto';
import { VerifyAccessTokenGuard } from 'src/guards/VerifyAccessTokenGuard.guard';

@ApiTags('api_v1_contact-types')
@Controller('/api/v1/contact-types')
export class ContactTypesController {
  constructor(private readonly contactTypesService: ContactTypesService) {}

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.Create)
  @ApiResponse(SwaggerApiResponse.Created)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post()
  create(@Body() contactTypeCreateDto: CreateContactTypeDto) {
    return this.contactTypesService.create(contactTypeCreateDto);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.CreateBulk)
  @ApiResponse(SwaggerApiResponse.CreatedBulk)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Post('bulk')
  createBulk(@Body() contactTypeCreateBulkDto: CreateBulkContactTypeDto) {
    return this.contactTypesService.createBulk(contactTypeCreateBulkDto.bulk);
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.Find)
  @ApiResponse({ ...SwaggerApiResponse.Finded, type: [GetContactTypeDto] })
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get()
  findAll() {
    return this.contactTypesService.findAll();
  }

  @ApiTags('any')
  @ApiOperation(SwaggerApiOperation.FindById)
  @ApiResponse({ ...SwaggerApiResponse.FindedById, type: GetContactTypeDto })
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactTypesService.findOne(+id);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.UpdateById)
  @ApiResponse(SwaggerApiResponse.UpdatedById)
  @ApiResponse(SwaggerApiResponse.ValidationError)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.DublicateError)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() contactTypeUpdateDto: UpdateContactTypeDto,
  ) {
    return this.contactTypesService.update(+id, contactTypeUpdateDto);
  }

  @ApiTags('ADMIN')
  @ApiOperation(SwaggerApiOperation.DeleteById)
  @ApiResponse(SwaggerApiResponse.DeletedById)
  @ApiResponse(SwaggerApiResponse.UnauthorizedAdmin)
  @ApiResponse(SwaggerApiResponse.NotFound)
  @ApiResponse(SwaggerApiResponse.ServerError)
  @ApiBearerAuth('access-token')
  @UseGuards(IsAdministratorGuard)
  @UseGuards(VerifyAccessTokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactTypesService.remove(+id);
  }
}
