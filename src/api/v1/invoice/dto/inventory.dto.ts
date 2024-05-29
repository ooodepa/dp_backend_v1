import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

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
