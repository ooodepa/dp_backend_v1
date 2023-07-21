import { ApiPropertyOptions } from '@nestjs/swagger';

interface IUnpDataDto {
  VUNP: ApiPropertyOptions;
  VNAIMP: ApiPropertyOptions;
  VNAIMK: ApiPropertyOptions;
  VPADRES: ApiPropertyOptions;
  DREG: ApiPropertyOptions;
  NMNS: ApiPropertyOptions;
  VMNS: ApiPropertyOptions;
  CKODSOST: ApiPropertyOptions;
  VKODS: ApiPropertyOptions;
  DLIKV: ApiPropertyOptions;
  VLIKV: ApiPropertyOptions;
}

interface IGetUnpDto {
  ROW: ApiPropertyOptions;
}

export const UnpDataApiProperty: IUnpDataDto = {
  VUNP: {
    description: 'УНП',
    example: '100582333',
  },
  VNAIMP: {
    description: 'Наименование юридического лица',
    example: 'Министерство по налогам и сборам Республики Беларусь',
  },
  VNAIMK: {
    description: 'Краткое наименование юридического лица',
    example: 'МНС',
  },
  VPADRES: {
    description: 'Место нахождения юридического лица',
    example: 'г.Минск,ул.Советская,9',
  },
  DREG: {
    description: 'Дата постановки на учет',
    example: '30.06.1994',
  },
  NMNS: {
    description: 'Код инспекции МНС',
    example: '104',
  },
  VMNS: {
    description: 'Наименование инспекции МНС',
    example: 'Инспекция МНС по Московскому району г.Минска ',
  },
  CKODSOST: {
    description: 'Состояние (1 | L)',
    example: '1',
  },
  VKODS: {
    description: 'Состояние (Действующий|Ликвидирован)',
    example: 'Действующий',
  },
  DLIKV: {
    description: 'Дата изменения состояния (DD.MM.YYYY | null)',
    example: null,
  },
  VLIKV: {
    example: null,
  },
};
