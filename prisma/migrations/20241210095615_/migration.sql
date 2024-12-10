/*
  Warnings:

  - A unique constraint covering the columns `[vendorId]` on the table `shops` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "shops_vendorId_key" ON "shops"("vendorId");
