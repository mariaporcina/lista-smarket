import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import products from './helpers/products';

async function main() {

  console.log('Creating products...');

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true, // Skip duplicates if they already exist
  });

}

main()
  .then(async () => {
    console.log('Products created successfully!')
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  });

