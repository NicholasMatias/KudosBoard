-- CreateTable
CREATE TABLE "Card" (
    "id" SERIAL NOT NULL,
    "cardTitle" TEXT NOT NULL,
    "cardAuthor" TEXT NOT NULL,
    "cardImg" TEXT NOT NULL,
    "cardInfo" TEXT NOT NULL,
    "kudoCard_boardsId" INTEGER,

    CONSTRAINT "Card_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_kudoCard_boardsId_fkey" FOREIGN KEY ("kudoCard_boardsId") REFERENCES "KudoCard_boards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
