import { Type } from 'class-transformer';
import { ArrayMinSize, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateLstHelperCommunicationDto {
  dp_helperId: string;

  @ApiProperty({ example: 1 })
  dp_contactTypeId: number;

  @ApiProperty({ example: '+375331112233' })
  dp_value: string;

  @ApiProperty({ example: false })
  dp_isHidden: boolean;
}

export class CreateHelperDto {
  @ApiProperty()
  dp_sortingIndex: number;

  @ApiProperty()
  dp_name: string;

  @ApiProperty()
  dp_description: string;

  @ApiProperty({ example: false })
  dp_isHidden: boolean;

  @IsArray()
  @ArrayMinSize(0)
  @Type(() => CreateLstHelperCommunicationDto)
  @ApiProperty({ type: [CreateLstHelperCommunicationDto] })
  dp_helperContactTypes: CreateLstHelperCommunicationDto[];
}
