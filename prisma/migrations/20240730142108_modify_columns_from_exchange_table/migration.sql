/*
  Warnings:

  - You are about to drop the column `max` on the `Exchange` table. All the data in the column will be lost.
  - You are about to drop the column `min` on the `Exchange` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exchange" DROP COLUMN "max",
DROP COLUMN "min",
ADD COLUMN     "buy" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "sell" DOUBLE PRECISION NOT NULL DEFAULT 0.00;
