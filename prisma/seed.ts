import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter } as any);

  console.log('🌱 Starting seed...');

  // Create Hospital A
  const hospitalA = await prisma.tenant.upsert({
    where: { name: 'Aba General Hospital' },
    update: {},
    create: {
      name: 'Aba General Hospital',
    },
  });

  // Create Hospital B
  const hospitalB = await prisma.tenant.upsert({
    where: { name: 'Ariaria Medical Center' },
    update: {},
    create: {
      name: 'Ariaria Medical Center',
    },
  });

  console.log(`✅ Seeded: ${hospitalA.name} (${hospitalA.id})`);
  console.log(`✅ Seeded: ${hospitalB.name} (${hospitalB.id})`);

  await prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(() => {
    console.log('🏁 Seed process finished.');
  });