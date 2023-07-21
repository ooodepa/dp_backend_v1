import { ApiProperty } from '@nestjs/swagger';

import { UnpDataApiProperty } from '../portal-nalog-gov-by.swagger';

class UnpDataDto {
  @ApiProperty(UnpDataApiProperty.VUNP)
  VUNP: string;

  @ApiProperty(UnpDataApiProperty.VNAIMP)
  VNAIMP: string;

  @ApiProperty(UnpDataApiProperty.VNAIMK)
  VNAIMK: string;

  @ApiProperty(UnpDataApiProperty.VPADRES)
  VPADRES: string;

  @ApiProperty(UnpDataApiProperty.DREG)
  DREG: string;

  @ApiProperty(UnpDataApiProperty.VMNS)
  NMNS: string;

  @ApiProperty(UnpDataApiProperty.VMNS)
  VMNS: string;

  @ApiProperty(UnpDataApiProperty.CKODSOST)
  CKODSOST: string;

  @ApiProperty(UnpDataApiProperty.VKODS)
  VKODS: string;

  @ApiProperty(UnpDataApiProperty.DLIKV)
  DLIKV: string | null;

  @ApiProperty(UnpDataApiProperty.VLIKV)
  VLIKV: string | null;
}

export default class GetUnpDto {
  @ApiProperty()
  ROW: UnpDataDto;
}
