import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ItemBrandDto from './item-brand.dto';
import ItemBrandsApiProperty from '../item-brands.swagger';

export default class ItemBrandWithIdDto extends ItemBrandDto {
  @IsNumber()
  @ApiProperty(ItemBrandsApiProperty.dp_id)
  dp_id: number;
}
