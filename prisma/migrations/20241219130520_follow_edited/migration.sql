/*
  Warnings:

  - You are about to drop the `CustomerFollowsShops` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "CustomerFollowsShops";

-- CreateTable
CREATE TABLE "customer_follow_shops" (
    "customerId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "customer_follow_shops_pkey" PRIMARY KEY ("customerId","shopId")
);

-- AddForeignKey
ALTER TABLE "customer_follow_shops" ADD CONSTRAINT "customer_follow_shops_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_follow_shops" ADD CONSTRAINT "customer_follow_shops_shopId_fkey" FOREIGN KEY ("shopId") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
