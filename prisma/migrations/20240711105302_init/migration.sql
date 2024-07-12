-- CreateTable
CREATE TABLE "ProfileEn" (
    "id" SERIAL NOT NULL,
    "userSub" TEXT NOT NULL,
    "personalIntroduction" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "hobby" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileEn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileCn" (
    "id" SERIAL NOT NULL,
    "userSub" TEXT NOT NULL,
    "personalIntroduction" TEXT NOT NULL,
    "skills" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "hobby" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProfileCn_pkey" PRIMARY KEY ("id")
);
