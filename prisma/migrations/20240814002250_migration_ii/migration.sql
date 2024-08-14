/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL,
ALTER COLUMN "password" DROP DEFAULT;

-- ADDIsAdmin
ALTER TABLE "User" ADD COLUMN "isAdmin" BOOLEAN DEFAULT FALSE;
