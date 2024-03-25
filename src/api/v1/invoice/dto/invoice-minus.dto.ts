import { ApiProperty } from '@nestjs/swagger';

class BulkInvoiceMinusDto {
  @ApiProperty()
  dp_vendorId: string;

  @ApiProperty()
  dp_count: number;

  @ApiProperty()
  dp_comment: string;
}

export class CreateInvoiceMinusDto {
  @ApiProperty()
  date: string;

  @ApiProperty({ type: [BulkInvoiceMinusDto] })
  bulk: BulkInvoiceMinusDto[];
}
