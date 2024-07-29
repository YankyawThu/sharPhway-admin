/*
  Warnings:

  - Added the required column `img1` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img2` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img3` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img4` to the `News` table without a default value. This is not possible if the table is not empty.
  - Added the required column `img5` to the `News` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "News" ADD COLUMN     "img1" TEXT NOT NULL,
ADD COLUMN     "img2" TEXT NOT NULL,
ADD COLUMN     "img3" TEXT NOT NULL,
ADD COLUMN     "img4" TEXT NOT NULL,
ADD COLUMN     "img5" TEXT NOT NULL;
