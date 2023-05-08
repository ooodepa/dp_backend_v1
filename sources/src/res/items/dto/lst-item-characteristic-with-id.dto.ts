import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';

import LstItemCharacteristicsApiProperty from '../lst-item-galery.swagger';
import LstItemCharacteristicNoIdDto from './lst-item-characteristic-no-id.dto';

export default class LstItemCharacteristicWithIdDto extends LstItemCharacteristicNoIdDto {
  @IsNumber()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_id)
  dp_id: number;

  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @ApiProperty(LstItemCharacteristicsApiProperty.dp_itemId)
  dp_itemId: string;
}
