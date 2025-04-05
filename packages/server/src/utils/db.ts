import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';
import * as schema from '../db/schema';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const initializeDB = async () => {
    try {
      await db.execute('SELECT 1;');
      console.log('✅ Connected to PostgreSQL');
    } catch (err) {
      console.error('❌ Database connection failed', err);
    }
}

export const db = drizzle(pool, { schema });
