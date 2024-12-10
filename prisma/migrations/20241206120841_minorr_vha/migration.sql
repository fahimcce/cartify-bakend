-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_customerId_fkey";

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "customerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
