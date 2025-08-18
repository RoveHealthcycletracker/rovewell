import 'dotenv/config';
import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from '@shared/schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Supabase requires SSL for external connections
const client = postgres(connectionString, { prepare: false, ssl: 'require' });

export const db = drizzle(client, { schema });