// prisma.config.ts
import path from 'path';
import * as dotenv from 'dotenv';
import { defineConfig } from '@prisma/config';

// Manually load from the current directory
dotenv.config({ path: path.join(__dirname, '.env') });

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
