/*
  Warnings:

  - You are about to drop the column `vendorId` on the `products` table. All the data in the column will be lost.
  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Categories" DROP CONSTRAINT "Categories_productId_fkey";

-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_vendorId_fkey";

-- AlterTable
ALTER TABLE "products" DROP COLUMN "vendorId";

-- DropTable
DROP TABLE "Categories";

-- CreateTable
CREATE TABLE "categories" (
    "productId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("productId","categoryId")
);

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "productCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
