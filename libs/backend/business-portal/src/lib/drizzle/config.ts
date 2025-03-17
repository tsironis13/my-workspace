import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './schema/index.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: <string>process.env['DATABASE_URL'],
  },
  verbose: true,
  strict: true,
});
