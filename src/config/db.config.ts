import {PostgresConnectionOptions} from "typeorm/driver/postgres/PostgresConnectionOptions"
import * as dotenv from 'dotenv';
import {DataSource} from "typeorm";

dotenv.config();
export const pgConfig= () : PostgresConnectionOptions => ( {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port: parseInt(process.env.DATABASE_PORT || '5432', 10),
    username: process.env.DATABASE_USER || 'usr',
    password: process.env.DATABASE_PASSWORD || 'pwd',
    database: process.env.DATABASE_NAME || 'order-management',
    entities: [__dirname + '/../entities/*.entity.{js,ts}'],
    migrations: [__dirname + '/../migrations/*.{js,ts}'],
    migrationsRun: false,
    synchronize: true,
    logging: true,
});

export default  new DataSource({
    ...pgConfig(),
});