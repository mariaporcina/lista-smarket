import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

import { products, categories } from './helpers/products';

async function main() {

  console.log('Creating categories...');

  await prisma.category.createMany({
    data: categories,
    skipDuplicates: true,
  });

  console.log('Categories created successfully!');

  console.log('Creating products...');

  await prisma.product.createMany({
    data: products.map(product => ({
      id: product.id,
      categoryId: categories.find(category => category.id === product.category)?.id!,
      name: product.name,
    })),
    skipDuplicates: true,
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

