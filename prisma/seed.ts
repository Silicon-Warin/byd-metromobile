import { PrismaClient } from '@prisma/client';
import { seedSeal } from './seeders/seal';
import { seedSealion7 } from './seeders/sealion7';
import { seedDolphin } from './seeders/dolphin';
import { seedM6 } from './seeders/m6';

const prisma = new PrismaClient();

async function main() {
  // เรียกใช้งานฟังก์ชัน seeder ต่างๆ
  await seedSeal(prisma);
  await seedSealion7(prisma);
  await seedDolphin(prisma); 
  await seedM6(prisma);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

