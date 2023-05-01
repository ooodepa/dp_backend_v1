import * as path from 'path';
import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config({
  path: process.env.NODE_ENV
    ? path.join(`${process.env.NODE_ENV}.env`)
    : path.join('.env'),
});

export const dataSourceOptions: DataSourceOptions = {
  type:
    process.env.APP__DB_TYPE == 'mysql'
      ? 'mysql'
      : process.env.APP__DB_TYPE == 'postgres'
      ? 'postgres'
      : 'mysql',
  host: process.env.APP__DB_HOST,
  port: Number(process.env.APP__DB_PORT),
  username: process.env.APP__DB_USER,
  password: process.env.APP__DB_PASS,
  database: process.env.APP__DB_NAME,
  entities: [path.join('dist', '**', '*.entity.js')],
  migrations: [path.join('dist', 'migrations', '*.js')],
  migrationsTableName: 'DP_migrations',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
