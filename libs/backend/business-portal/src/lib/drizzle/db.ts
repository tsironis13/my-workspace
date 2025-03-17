import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

//const client = postgres(process.env['DATABASE_URL'] ?? '');
const client = postgres(
  //businessporta-db-password: YzfCwQunykpicAvE
  'postgresql://postgres.tikfxljuvjqcqeibbgey:YzfCwQunykpicAvE@aws-0-eu-central-1.pooler.supabase.com:6543/postgres'
);
export const db = drizzle(client, { schema, logger: true });
