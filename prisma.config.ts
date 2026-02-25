// prisma.config.ts
import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export default defineConfig({
  migrations: {
    // This tells Prisma how to run your seed file
    seed: 'node --loader ts-node/esm ./prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});