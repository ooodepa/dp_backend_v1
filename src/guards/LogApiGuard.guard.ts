import * as fs from 'fs';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class LogApiGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      const DATETIME = new Date().toJSON().slice(0, 19);
      const HTTP_METHOD = req.method;
      const HTTP_URL = req.url;
      const IP = `${
        req?.headers['x-forwarded-for'] || req?.connection.remoteAddress
      }`;
      const USER_AGENT = req.headers['user-agent'] || 'Unknown';

      const FILENAME = '_log_api.csv';
      const TEXT =
        [DATETIME, IP, HTTP_METHOD, HTTP_URL, USER_AGENT].join('\t') + '\n';
      await fs.promises.appendFile(FILENAME, TEXT);
    } catch (exception) {}

    return true;
  }
}
