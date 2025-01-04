-- AlterTable
ALTER TABLE "shops" ADD COLUMN     "follower" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "CustomerFollowsShops" (
    "customerId" TEXT NOT NULL,
    "shopId" TEXT NOT NULL,

    CONSTRAINT "CustomerFollowsShops_pkey" PRIMARY KEY ("customerId","shopId")
);

-- CreateTable
CREATE TABLE "_CustomerFollowsShops" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CustomerFollowsShops_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CustomerFollowsShops_B_index" ON "_CustomerFollowsShops"("B");

-- AddForeignKey
ALTER TABLE "_CustomerFollowsShops" ADD CONSTRAINT "_CustomerFollowsShops_A_fkey" FOREIGN KEY ("A") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CustomerFollowsShops" ADD CONSTRAINT "_CustomerFollowsShops_B_fkey" FOREIGN KEY ("B") REFERENCES "shops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
