import { ApiPropertyOptions } from '@nestjs/swagger';

interface IProps {
  dp_id: ApiPropertyOptions;
  dp_date: ApiPropertyOptions;
  dp_ip: ApiPropertyOptions;
  dp_agent: ApiPropertyOptions;
  dp_accessToken: ApiPropertyOptions;
  dp_refreshToken: ApiPropertyOptions;
  dp_userId: ApiPropertyOptions;
}

const SessionsApiProperty: IProps = {
  dp_id: {
    example: 1,
  },
  dp_date: {
    example: '2023-01-01T00:00:00:000Z',
  },
  dp_ip: {
    example: '111.111.111.111',
  },
  dp_agent: {
    example: 'Firefox',
  },
  dp_accessToken: {
    example: 'jwt',
  },
  dp_refreshToken: {
    example: 'jwt',
  },
  dp_userId: {
    example: 1,
  },
};

export default SessionsApiProperty;
