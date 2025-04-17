import type { Knex } from 'knex';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const knexConfig: Knex.Config = {
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host: configService.get<string>('DB_HOST'),
    port: parseInt(configService.get<string>('DB_PORT') || '5432'),
    database: configService.get<string>('DB_NAME'),
    user: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASS'),
    ssl: false,
  },
  migrations: {
    directory: './migrations',
    tableName: 'knex_migrations',
  },
};

export default knexConfig;
