import { ApiProperty } from '@nestjs/swagger';

export interface IGetResponseData {
  message?: string;
  data?: any;
}

export class AppResponse {
  @ApiProperty()
  status: string;

  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;

  data: any;
}

export function getOkResponse(data: IGetResponseData) {
  const response: AppResponse = {
    status: '200 OK',
    statusCode: 200,
    message: data.message || '',
    data: data.data || {},
  };
  return response;
}

export function getNotFoundResponse(data: IGetResponseData) {
  const response: AppResponse = {
    status: '404 NOT FOUND',
    statusCode: 404,
    message: data.message || '',
    data: data.data || {},
  };
  return response;
}

export function getConflictResponse(data: IGetResponseData) {
  const response: AppResponse = {
    status: '409 Conflict',
    statusCode: 409,
    message: data.message || '',
    data: data.data || {},
  };
  return response;
}
