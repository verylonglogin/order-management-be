import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions"
import * as dotenv from 'dotenv';

dotenv.config();
export const pgConfig: PostgresConnectionOptions = {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'db',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'usr',
    password: process.env.DATABASE_PASSWORD || 'pwd',
    database: process.env.DATABASE_NAME || 'order-management',
    entities: [__dirname + '/../entities/*.entity.{js,ts}'],
    migrations: [__dirname + '/**/migration/*.ts'],
    synchronize: true,
    logging: false,
}