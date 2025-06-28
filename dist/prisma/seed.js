"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const products_1 = require("./helpers/products");
async function main() {
    console.log('Creating categories...');
    await prisma.category.createMany({
        data: products_1.categories,
        skipDuplicates: true,
    });
    console.log('Categories created successfully!');
    console.log('Creating products...');
    await prisma.product.createMany({
        data: products_1.products.map(product => ({
            id: product.id,
            categoryId: products_1.categories.find(category => category.id === product.category)?.id,
            name: product.name,
        })),
        skipDuplicates: true,
    });
}
main()
    .then(async () => {
    console.log('Products created successfully!');
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
//# sourceMappingURL=seed.js.map