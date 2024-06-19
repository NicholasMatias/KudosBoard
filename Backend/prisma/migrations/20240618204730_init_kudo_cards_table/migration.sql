-- CreateTable
CREATE TABLE "KudoCard" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imgSrc" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "KudoCard_pkey" PRIMARY KEY ("id")
);
