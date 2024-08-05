/*
  Warnings:

  - You are about to drop the column `companyNameEn` on the `ProjectExp` table. All the data in the column will be lost.
  - You are about to drop the column `companyNameZh` on the `ProjectExp` table. All the data in the column will be lost.
  - You are about to drop the column `detailsEn` on the `ProjectExp` table. All the data in the column will be lost.
  - You are about to drop the column `detailsZh` on the `ProjectExp` table. All the data in the column will be lost.
  - You are about to drop the column `technologyStackEn` on the `ProjectExp` table. All the data in the column will be lost.
  - You are about to drop the column `technologyStackZh` on the `ProjectExp` table. All the data in the column will be lost.
  - You are about to drop the column `introductionEn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `introductionZh` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nameEn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nameZh` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `positionEn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `positionZh` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skillsEn` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `skillsZh` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectExp" DROP COLUMN "companyNameEn",
DROP COLUMN "companyNameZh",
DROP COLUMN "detailsEn",
DROP COLUMN "detailsZh",
DROP COLUMN "technologyStackEn",
DROP COLUMN "technologyStackZh",
ADD COLUMN     "company_name_en" TEXT,
ADD COLUMN     "company_name_zh" TEXT,
ADD COLUMN     "details_en" TEXT,
ADD COLUMN     "details_zh" TEXT,
ADD COLUMN     "technology_stack_en" TEXT,
ADD COLUMN     "technology_stack_zh" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "introductionEn",
DROP COLUMN "introductionZh",
DROP COLUMN "nameEn",
DROP COLUMN "nameZh",
DROP COLUMN "positionEn",
DROP COLUMN "positionZh",
DROP COLUMN "skillsEn",
DROP COLUMN "skillsZh",
ADD COLUMN     "introduction_en" TEXT,
ADD COLUMN     "introduction_zh" TEXT,
ADD COLUMN     "name_en" TEXT,
ADD COLUMN     "name_zh" TEXT,
ADD COLUMN     "position_en" TEXT,
ADD COLUMN     "position_zh" TEXT,
ADD COLUMN     "skills_en" TEXT,
ADD COLUMN     "skills_zh" TEXT;
