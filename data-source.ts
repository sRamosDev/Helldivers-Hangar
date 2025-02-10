// data-source.ts
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
// Import any other entities if needed

// Load environment variables (adjust the path if necessary)
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'], // adjust path if needed
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: process.env.DB_SYNCHRONIZE === 'false',
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
