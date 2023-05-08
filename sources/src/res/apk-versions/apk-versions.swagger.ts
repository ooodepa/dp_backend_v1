import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_date: ApiPropertyOptions;
  dp_version: ApiPropertyOptions;
  dp_url: ApiPropertyOptions;
}

const ApkVersionsApiProperty: IProps = {
  dp_id: {
    example: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
  },
  dp_date: {
    example: '2023-01-01T00:00:00.000Z',
  },
  dp_version: {
    example: '0.1.0',
  },
  dp_url: {
    example: 'https://example.com/app-release-v0.1.0.apk',
  },
};

export default ApkVersionsApiProperty;
