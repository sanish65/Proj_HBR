import { configDotenv } from 'dotenv';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

configDotenv();

const ormDataSource = {
  type: 'postgres',
  applicationName: process.env.APP_NAME,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  testDatabase: process.env.TEST_DATABASE_NAME,
  synchronize: false,
  autoLoadEntities: true,
  logging: false,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: true,
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
} as DataSourceOptions;

console.log(ormDataSource);

export default registerAs('ormConfig', () => ormDataSource);

export const connectionSource = new DataSource(ormDataSource);
