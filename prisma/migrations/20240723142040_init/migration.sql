/*
  Warnings:

  - You are about to drop the column `companyName` on the `ProjectExp` table. All the data in the column will be lost.
  - You are about to drop the column `details` on the `ProjectExp` table. All the data in the column will be lost.
  - You are about to drop the column `technologyStack` on the `ProjectExp` table. All the data in the column will be lost.
  - You are about to drop the column `introductionCn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nameCn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `positionCn` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectExp" DROP COLUMN "companyName",
DROP COLUMN "details",
DROP COLUMN "technologyStack";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "introductionCn",
DROP COLUMN "nameCn",
DROP COLUMN "positionCn",
ADD COLUMN     "introductionZh" TEXT,
ADD COLUMN     "nameZh" TEXT,
ADD COLUMN     "positionZh" TEXT,
ADD COLUMN     "skillsEn" TEXT,
ADD COLUMN     "skillsZh" TEXT;
