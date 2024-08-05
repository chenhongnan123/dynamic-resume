/*
  Warnings:

  - A unique constraint covering the columns `[timestamp]` on the table `ProjectExp` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectExp_timestamp_key" ON "ProjectExp"("timestamp");
