import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
  entities: ['dist/**/*.entity{.js}'], // In runtime
  migrations: ['dist/database/migrations/*{.js}'],
  synchronize: false, // Set to false in production
  logging: false, // Set to true for debugging
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
