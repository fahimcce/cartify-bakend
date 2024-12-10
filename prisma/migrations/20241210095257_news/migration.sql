/*
  Warnings:

  - A unique constraint covering the columns `[shopId]` on the table `products` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "products_shopId_key" ON "products"("shopId");
