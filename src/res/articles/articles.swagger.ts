import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_name: ApiPropertyOptions;
  dp_date: ApiPropertyOptions;
  dp_urlSegment: ApiPropertyOptions;
  dp_photoUrl: ApiPropertyOptions;
  dp_text: ApiPropertyOptions;
  dp_sortingIndex: ApiPropertyOptions;
  dp_seoKeywords: ApiPropertyOptions;
  dp_seoDescription: ApiPropertyOptions;
  dp_isHidden: ApiPropertyOptions;
  dp_articleAttachedLinks: ApiPropertyOptions;
}

const ArticleApiProperty: IProps = {
  dp_id: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
  dp_name: {
    example: 'Сертификаты',
  },
  dp_date: {
    example: '2023-01-01T00:00:00.000Z',
  },
  dp_urlSegment: {
    example: 'certificates',
  },
  dp_photoUrl: {
    example: 'https://example.com/img.png',
  },
  dp_text: {
    example: 'My certificates',
  },
  dp_sortingIndex: {
    example: 10000,
  },
  dp_seoKeywords: {
    example: 'сертификаты сертификат',
  },
  dp_seoDescription: {
    example: 'Страница сертификатов',
  },
  dp_isHidden: {
    example: false,
  },
  dp_articleAttachedLinks: {
    example: [],
  },
};

export default ArticleApiProperty;
