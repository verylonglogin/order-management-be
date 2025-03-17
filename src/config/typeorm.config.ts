import {DataSource} from 'typeorm';
import {config} from 'dotenv';

config();

export const pgDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'db',
    port: Number(process.env.DB_PORT || '5432') ,
    username: process.env.DATABASE_PORT || 'usr',
    password: process.env.DATABASE_USER || 'pwd',
    database: process.env.DATABASE_NAME || 'order-management',
    entities: ["src/entities/*.entity.{js,ts}"],
    migrations: ["src/migrations/**/*.ts"],
    synchronize: false,
    logging: ['query', 'error'],
});
