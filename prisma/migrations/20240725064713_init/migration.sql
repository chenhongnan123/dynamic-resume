/*
  Warnings:

  - A unique constraint covering the columns `[order]` on the table `ProjectExp` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProjectExp" ADD COLUMN     "order" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "ProjectExp_order_key" ON "ProjectExp"("order");
