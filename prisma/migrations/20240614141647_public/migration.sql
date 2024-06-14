/*
  Warnings:

  - Added the required column `edad` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "edad" TIMESTAMP(3) NOT NULL;
