/*
  Warnings:

  - You are about to drop the `Events` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Events";

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "showOnProfile" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);
