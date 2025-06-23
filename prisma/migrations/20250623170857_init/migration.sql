/*
  Warnings:

  - You are about to drop the column `shoppingListId` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_shoppingListId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "shoppingListId";

-- CreateTable
CREATE TABLE "ShoppingListProduct" (
    "shoppingListId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ShoppingListProduct_pkey" PRIMARY KEY ("shoppingListId","productId")
);

-- AddForeignKey
ALTER TABLE "ShoppingListProduct" ADD CONSTRAINT "ShoppingListProduct_shoppingListId_fkey" FOREIGN KEY ("shoppingListId") REFERENCES "ShoppingList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ShoppingListProduct" ADD CONSTRAINT "ShoppingListProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
