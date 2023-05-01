import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ItemBrandDto from './item-brand.dto';
import ItemBrandApiProperty from '../item-brands-api-property';

export default class ItemBrandWithIdDto extends ItemBrandDto {
  @IsNumber()
  @ApiProperty(ItemBrandApiProperty.dp_id)
  dp_id: number;
}
