/*
  Warnings:

  - Added the required column `personalIntroductionCn` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personalIntroductionEn` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "personalIntroductionCn" TEXT NOT NULL,
ADD COLUMN     "personalIntroductionEn" TEXT NOT NULL;
