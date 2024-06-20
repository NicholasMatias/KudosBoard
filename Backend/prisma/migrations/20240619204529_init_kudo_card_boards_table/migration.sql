/*
  Warnings:

  - You are about to drop the `KudoCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "KudoCard";

-- CreateTable
CREATE TABLE "KudoCard_boards" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "KudoCard_boards_pkey" PRIMARY KEY ("id")
);
