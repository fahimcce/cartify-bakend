/*
  Warnings:

  - Added the required column `customerId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopId` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_id_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "shopId" TEXT NOT NULL,
ADD COLUMN     "vendorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
