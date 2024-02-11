import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LanguagesService } from './languages.service';
import { LanguageEntity } from 'src/entities/language.entity';
import { LanguagesController } from './languages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LanguageEntity])],
  controllers: [LanguagesController],
  providers: [LanguagesService],
})
export class LanguagesModule {}
