/*
  Warnings:

  - The `fileSize` column on the `ProjectExp` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProjectExp" DROP COLUMN "fileSize",
ADD COLUMN     "fileSize" INTEGER;
