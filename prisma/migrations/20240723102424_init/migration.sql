/*
  Warnings:

  - You are about to drop the column `personalIntroductionCn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `personalIntroductionEn` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "personalIntroductionCn",
DROP COLUMN "personalIntroductionEn",
ADD COLUMN     "introductionCn" TEXT,
ADD COLUMN     "introductionEn" TEXT;
