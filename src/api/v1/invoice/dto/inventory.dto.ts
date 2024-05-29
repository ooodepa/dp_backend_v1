import { ApiProperty } from '@nestjs/swagger';
import { AppResponse } from 'src/utils/getResponse/getResponse';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateInventoryDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  dp_vendorId: string;

  @IsNumber()
  @ApiProperty()
  dp_count: number;

  @IsString()
  @ApiProperty()
  dp_note: string;
}

export class BodyCreateInventoryDto {
  @ApiProperty({ type: [CreateInventoryDto] })
  bulk: CreateInventoryDto[];
}

export class GetInventoryDto {
  @ApiProperty()
  dp_id: number;

  @ApiProperty()
  dp_warehouseId: number;

  @ApiProperty()
  dp_vendorId: string;

  @ApiProperty()
  dp_count: number;

  @ApiProperty()
  dp_note: string;
}

export class ResponseGetInventoryDto extends AppResponse {
  @ApiProperty({ type: [GetInventoryDto] })
  data: GetInventoryDto[];
}
