import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'sqlite',
  driver: 'turso',
  schema: './src/db/schema.ts',
  out: './migrations',
  dbCredentials: {
    url: process.env.DATABASE_URL || '',
  },
});
