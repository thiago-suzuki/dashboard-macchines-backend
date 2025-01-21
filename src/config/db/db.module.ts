import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import {
  PG_WRITE_CONNECTION,
  PORT,
  WRITE_DATABASE,
  WRITE_HOST,
  WRITE_PASSWORD,
  WRITE_USERNAME
} from '@/config/db/constants';

const WRITE_POOL = new Pool({
  user: WRITE_USERNAME,
  host: WRITE_HOST,
  database: WRITE_DATABASE,
  password: WRITE_PASSWORD,
  port: PORT,
  ssl: true
}).on('connect', (client) => client.query('SET timezone="America/Sao_Paulo"'));

const dbProvider = [
  {
    provide: PG_WRITE_CONNECTION,
    useValue: WRITE_POOL,
  },
];

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [...dbProvider],
  exports: [...dbProvider],
})
export class DbModule {}