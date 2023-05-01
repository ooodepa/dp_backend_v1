import { ApiProperty } from '@nestjs/swagger';

import ItemsApiProperty from '../items-api-property';

export default class GetItemShortDto {
  @ApiProperty(ItemsApiProperty.dp_id)
  dp_id: string;

  @ApiProperty(ItemsApiProperty.dp_name)
  dp_name: string;

  @ApiProperty(ItemsApiProperty.dp_model)
  dp_model: string;

  @ApiProperty(ItemsApiProperty.dp_cost)
  dp_cost: number;

  @ApiProperty(ItemsApiProperty.dp_photoUrl)
  dp_photoUrl: string;

  @ApiProperty(ItemsApiProperty.dp_itemCategoryId)
  dp_itemCategoryId: number;

  @ApiProperty(ItemsApiProperty.dp_seoKeywords)
  dp_seoKeywords: string;

  @ApiProperty(ItemsApiProperty.dp_seoDescription)
  dp_seoDescription: string;
}
