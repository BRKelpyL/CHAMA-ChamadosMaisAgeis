/*
  Warnings:

  - Added the required column `relation` to the `UserToServiceOrder` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserToServiceOrder" ADD COLUMN     "relation" TEXT NOT NULL;
