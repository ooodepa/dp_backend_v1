import { Module } from '@nestjs/common';
import { PortalNalogGovByService } from './portal-nalog-gov-by.service';
import { PortalNalogGovByController } from './portal-nalog-gov-by.controller';

@Module({
  controllers: [PortalNalogGovByController],
  providers: [PortalNalogGovByService],
})
export class PortalNalogGovByModule {}
