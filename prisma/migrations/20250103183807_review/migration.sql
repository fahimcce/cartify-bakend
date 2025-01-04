-- AlterTable
ALTER TABLE "products" ADD COLUMN     "flashSale" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "reviews" ALTER COLUMN "rating" SET DATA TYPE DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "reviewproducts" (
    "reviewId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,

    CONSTRAINT "reviewproducts_pkey" PRIMARY KEY ("reviewId","productId")
);

-- AddForeignKey
ALTER TABLE "reviewproducts" ADD CONSTRAINT "reviewproducts_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reviewproducts" ADD CONSTRAINT "reviewproducts_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
