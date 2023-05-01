import { Module } from '@nestjs/common';
import { ApkVersionsService } from './apk-versions.service';
import { ApkVersionsController } from './apk-versions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApkVersionEntity } from './entities/apk-version.entity';

@Module({
  controllers: [ApkVersionsController],
  providers: [ApkVersionsService],
  imports: [TypeOrmModule.forFeature([ApkVersionEntity])],
})
export class ApkVersionsModule {}
