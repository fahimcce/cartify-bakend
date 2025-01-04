/*
  Warnings:

  - The primary key for the `reviewproducts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `reviewproducts` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `reviewproducts` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropIndex
DROP INDEX "reviewproducts_reviewId_key";

-- AlterTable
ALTER TABLE "reviewproducts" DROP CONSTRAINT "reviewproducts_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "reviewproducts_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "reviewproducts_id_key" ON "reviewproducts"("id");
