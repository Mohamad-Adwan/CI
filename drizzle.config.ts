import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'turso',
  schema: './src/db/schema.ts',
  out: './migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
    authToken: process.env.TURSO_AUTH_TOKEN,
  },
});
