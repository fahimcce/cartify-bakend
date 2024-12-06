/*
  Warnings:

  - Made the column `categoryImage` on table `productCategories` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `vendorId` to the `shops` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "shops" DROP CONSTRAINT "shops_id_fkey";

-- AlterTable
ALTER TABLE "productCategories" ALTER COLUMN "categoryImage" SET NOT NULL;

-- AlterTable
ALTER TABLE "shops" ADD COLUMN     "vendorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "shops" ADD CONSTRAINT "shops_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
