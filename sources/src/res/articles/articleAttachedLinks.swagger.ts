import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_name: ApiPropertyOptions;
  dp_url: ApiPropertyOptions;
  dp_articleId: ApiPropertyOptions;
}

const ArticleAttachedLinksApiProperty: IProps = {
  dp_id: {
    example: 1,
  },
  dp_name: {
    example: 'Сертификат 1',
  },
  dp_url: {
    example: 'https://example.com/certificate1.pdf',
  },
  dp_articleId: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
};

export default ArticleAttachedLinksApiProperty;
