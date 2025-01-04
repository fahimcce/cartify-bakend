-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('COMPLETED', 'PENDING');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "PaymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING';
