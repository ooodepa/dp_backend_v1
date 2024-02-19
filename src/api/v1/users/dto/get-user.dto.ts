import { ApiProperty } from '@nestjs/swagger';

export default class GetUserDto {
  @ApiProperty()
  dp_id: number;

  @ApiProperty()
  dp_unp: string;

  @ApiProperty()
  dp_nameLegalEntity: string;

  @ApiProperty()
  dp_shortNameLegalEntity: string;

  @ApiProperty()
  dp_address: string;
}
