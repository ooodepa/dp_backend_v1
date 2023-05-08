import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import ItemBrandNoIdDto from './item-brand-no-id.dto';
import ItemBrandsApiProperty from '../item-brands.swagger';

export default class ItemBrandWithIdDto extends ItemBrandNoIdDto {
  @IsNumber()
  @ApiProperty(ItemBrandsApiProperty.dp_id)
  dp_id: number;
}
