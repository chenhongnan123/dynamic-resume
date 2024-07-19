/*
  Warnings:

  - You are about to drop the `ProfileCn` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProfileEn` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ProfileCn";

-- DropTable
DROP TABLE "ProfileEn";

-- CreateTable
CREATE TABLE "ProjectExp" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "usersub" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "durationTime" INTEGER,
    "technologyStackEn" TEXT,
    "technologyStackZh" TEXT,
    "companyNameEn" TEXT,
    "companyNameZh" TEXT,
    "companyName" TEXT,
    "detailsEn" TEXT,
    "detailsZh" TEXT,
    "details" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectExp_pkey" PRIMARY KEY ("id")
);
