/*
  Warnings:

  - A unique constraint covering the columns `[nameCn]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nameEn]` on the table `Skill` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Skill_nameCn_key" ON "Skill"("nameCn");

-- CreateIndex
CREATE UNIQUE INDEX "Skill_nameEn_key" ON "Skill"("nameEn");
