/*
  Warnings:

  - You are about to drop the `_CustomerFollowsShops` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customer_follow_shops` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CustomerFollowsShops" DROP CONSTRAINT "_CustomerFollowsShops_A_fkey";

-- DropForeignKey
ALTER TABLE "_CustomerFollowsShops" DROP CONSTRAINT "_CustomerFollowsShops_B_fkey";

-- DropForeignKey
ALTER TABLE "customer_follow_shops" DROP CONSTRAINT "customer_follow_shops_customerId_fkey";

-- DropForeignKey
ALTER TABLE "customer_follow_shops" DROP CONSTRAINT "customer_follow_shops_shopId_fkey";

-- DropTable
DROP TABLE "_CustomerFollowsShops";

-- DropTable
DROP TABLE "customer_follow_shops";

-- CreateTable
CREATE TABLE "customerFollowsShops" (
    "customerId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "customerFollowsShops_pkey" PRIMARY KEY ("customerId","shopId")
);

-- AddForeignKey
ALTER TABLE "customerFollowsShops" ADD CONSTRAINT "customerFollowsShops_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customerFollowsShops" ADD CONSTRAINT "customerFollowsShops_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
