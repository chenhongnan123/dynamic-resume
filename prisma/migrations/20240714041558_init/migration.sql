/*
  Warnings:

  - You are about to drop the column `userId` on the `Skill` table. All the data in the column will be lost.
  - You are about to drop the column `userSub` on the `Skill` table. All the data in the column will be lost.
  - Added the required column `userid` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Skill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersub` to the `Skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Skill" DROP COLUMN "userId",
DROP COLUMN "userSub",
ADD COLUMN     "userid" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ADD COLUMN     "usersub" TEXT NOT NULL;
