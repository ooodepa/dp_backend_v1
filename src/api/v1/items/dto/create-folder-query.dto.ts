import { ApiProperty } from '@nestjs/swagger';

export default class CreateItemFolderBodyDto {
  @ApiProperty({ required: false })
  dp_seoTitle: string;

  @ApiProperty()
  dp_urlSegment: string;

  @ApiProperty()
  dp_1cParentId: string;

  @ApiProperty()
  dp_urlSegments: string;
}
