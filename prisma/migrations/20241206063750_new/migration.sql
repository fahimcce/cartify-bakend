/*
  Warnings:

  - Added the required column `test` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "test" TEXT NOT NULL;
