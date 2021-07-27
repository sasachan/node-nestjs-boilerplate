import { User } from './src/users/user.entity';
import { ConnectionOptions } from "typeorm";
import * as dotenv from 'dotenv-safe';
dotenv.config();

const environment = process.env.NODE_ENV || 'development';

export const config: ConnectionOptions = {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: false,
      migrations: [
            'dist/src/db/migrations/*.js'
      ],
      cli: {
            migrationsDir: 'src/db/migrations'
      }
};

module.exports = config;
