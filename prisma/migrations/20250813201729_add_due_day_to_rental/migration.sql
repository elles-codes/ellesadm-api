/*
  Warnings:

  - Added the required column `dueDay` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Rental" ADD COLUMN     "dueDay" INTEGER NOT NULL;
