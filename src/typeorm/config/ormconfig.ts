import { join } from 'path';
import dotenv from 'dotenv';
import { ConnectionOptions } from 'typeorm';
dotenv.config();

const config: ConnectionOptions = {
    type: 'postgres',
    host: process.env.APP_DB_PATH,
    port: Number(process.env.APP_DB_PORT),
    username: process.env.APP_DB_USER,
    password: process.env.APP_DB_PASSWORD,
    database: process.env.APP_DB_DB,

    synchronize: !!process.env.APP_DB_RESETONSTART,
    migrationsRun: !!process.env.APP_DB_RESETONSTART,
    dropSchema: !!process.env.APP_DB_RESETONSTART,

    entities: [join(__dirname, '../entities/*{.ts,.js}')],
    migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
    cli: {
        migrationsDir: join(__dirname, '../migrations'),
    },
};

export = config;