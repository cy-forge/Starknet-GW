import * as dotenv from 'dotenv';
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true,   // Set to `false` in production
    logging: true,
    entities: ['src/entities/*.ts'],
    migrations: [],
    subscribers: []
});
