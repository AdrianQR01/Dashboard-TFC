/*
  Warnings:

  - You are about to drop the column `edad` on the `Cliente` table. All the data in the column will be lost.
  - Added the required column `fechaNacimiento` to the `Cliente` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "edad",
ADD COLUMN     "fechaNacimiento" TIMESTAMP(3) NOT NULL;
