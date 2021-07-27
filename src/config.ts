import { User } from './users/user.entity';
import * as dotenv from 'dotenv-safe';
dotenv.config();

const environment = process.env.NODE_ENV || 'development';

export const dbConfig: any = {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
      migrations: [
            './dist/src/db/migrations/*.js'
      ],
      cli: {
            migrationDir: 'src/db/migrations'
      }
};
