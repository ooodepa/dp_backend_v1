import { ApiProperty } from '@nestjs/swagger';

class BulkInvoicePlusDto {
  @ApiProperty()
  dp_vendorId: string;

  @ApiProperty()
  dp_count: number;

  @ApiProperty()
  dp_comment: string;
}

export class CreateInvoicePlusDto {
  @ApiProperty()
  date: string;

  @ApiProperty({ type: [BulkInvoicePlusDto] })
  bulk: BulkInvoicePlusDto[];
}
