/*
  Warnings:

  - You are about to drop the column `address` on the `Property` table. All the data in the column will be lost.
  - Added the required column `currentOwner` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Property` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Property` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Property" DROP COLUMN "address",
ADD COLUMN     "acquisitionValue" DECIMAL(12,2),
ADD COLUMN     "commonArea" DECIMAL(10,2),
ADD COLUMN     "currentOwner" TEXT NOT NULL,
ADD COLUMN     "inscription" TEXT,
ADD COLUMN     "inscriptionName" TEXT,
ADD COLUMN     "iptuResponsible" TEXT,
ADD COLUMN     "manager" TEXT,
ADD COLUMN     "privateArea" DECIMAL(10,2),
ADD COLUMN     "registration" TEXT,
ADD COLUMN     "registrationDate" TIMESTAMP(3),
ADD COLUMN     "registrationDoc" TEXT,
ADD COLUMN     "registrationName" TEXT,
ADD COLUMN     "registryOffice" TEXT,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "totalArea" DECIMAL(10,2),
ADD COLUMN     "type" TEXT NOT NULL;
