import { ApiProperty } from '@nestjs/swagger';

export default class SendCheckDto {
  @ApiProperty()
  dp_checkingAccount: string;
  @ApiProperty()
  dp_bank: string;
  @ApiProperty()
  dp_bik: string;
}
