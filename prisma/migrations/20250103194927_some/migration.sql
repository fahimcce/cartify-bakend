/*
  Warnings:

  - The primary key for the `reviewproducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[reviewId]` on the table `reviewproducts` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "reviewproducts" DROP CONSTRAINT "reviewproducts_pkey",
ADD CONSTRAINT "reviewproducts_pkey" PRIMARY KEY ("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "reviewproducts_reviewId_key" ON "reviewproducts"("reviewId");
