import { ApiProperty } from '@nestjs/swagger';
import { AppResponse } from 'src/utils/getResponse/getResponse';

export class WarehouseDto {
  @ApiProperty()
  dp_id: number;

  @ApiProperty()
  dp_name: string;
}

export class DataGetWirehouseDto extends WarehouseDto {}

export class ResponseGetWarehouseDto extends AppResponse {
  data: WarehouseDto;
}
