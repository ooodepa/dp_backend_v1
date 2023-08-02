import { ApiProperty } from '@nestjs/swagger';

import { UnpDataApiProperty } from '../portal-nalog-gov-by.swagger';

class UnpDataDto {
  @ApiProperty(UnpDataApiProperty.VUNP)
  vunp: string;

  @ApiProperty(UnpDataApiProperty.VNAIMP)
  vnaimp: string;

  @ApiProperty(UnpDataApiProperty.VNAIMK)
  vnaimk: string;

  @ApiProperty(UnpDataApiProperty.VPADRES)
  vpadres: string;

  @ApiProperty(UnpDataApiProperty.DREG)
  dreg: string;

  @ApiProperty(UnpDataApiProperty.VMNS)
  nmns: string;

  @ApiProperty(UnpDataApiProperty.VMNS)
  vmns: string;

  @ApiProperty(UnpDataApiProperty.CKODSOST)
  ckodsost: string;

  @ApiProperty(UnpDataApiProperty.VKODS)
  vkods: string;

  @ApiProperty(UnpDataApiProperty.DLIKV)
  dlikv: string | null;

  @ApiProperty(UnpDataApiProperty.VLIKV)
  vlikv: string | null;
}

export default class GetUnpDto {
  @ApiProperty()
  row: UnpDataDto;
}
