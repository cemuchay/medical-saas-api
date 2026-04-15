import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);

    // We pass the adapter to the super constructor.
    // If ESLint complains about "unsafe call", we can cast it to 'any'
    // just for the constructor call to bypass the strict check.
    super({ adapter } as any);
  }

  async onModuleInit() {
    // If $connect is still red, 'npx prisma generate' definitely failed.
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
