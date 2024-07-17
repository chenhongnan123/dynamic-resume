-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "userSub" TEXT NOT NULL,
    "nameCn" TEXT,
    "nameEn" TEXT,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);
