// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Starting Bulk Seeding (50+ Items)...');
  
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.menuItem.deleteMany();

  const categories = [
    { name: 'Pizza', baseImage: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500' },
    { name: 'Burger', baseImage: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500' },
    { name: 'Pasta', baseImage: 'https://images.unsplash.com/photo-1541014741259-df529411b96a?w=500' },
    { name: 'Sides', baseImage: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=500' },
    { name: 'Drinks', baseImage: 'https://images.unsplash.com/photo-1544145945-f904253d0c71?w=500' }
  ];

  const dummyData = [];

  // Generate 50 items algorithmically for variety
  for (let i = 1; i <= 50; i++) {
    const category = categories[i % categories.length];
    dummyData.push({
      name: `${category.name} Variant #${i}`,
      description: `Premium ${category.name} made with locally sourced ingredients. Experience item #${i} in our signature collection.`,
      price: parseFloat((Math.random() * (25 - 5) + 5).toFixed(2)),
      image: category.baseImage
    });
  }

  await prisma.menuItem.createMany({ data: dummyData });
  console.log('✅ Successfully seeded 50 items into Neon PostgreSQL!');
}

main()
  .catch(e => { console.error(e); process.exit(1); })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });