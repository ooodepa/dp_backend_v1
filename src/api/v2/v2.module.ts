import { Module } from '@nestjs/common';
import { SeoPagesModule } from './seo-pages/seo-pages.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [LanguagesModule, SeoPagesModule],
})
export class V2Module {}
