/*
  Warnings:

  - You are about to drop the column `clientId` on the `Rental` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `tenantId` to the `Rental` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Client" DROP CONSTRAINT "Client_companyId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Rental" DROP CONSTRAINT "Rental_clientId_fkey";

-- AlterTable
ALTER TABLE "public"."Rental" DROP COLUMN "clientId",
ADD COLUMN     "tenantId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "public"."Client";

-- AddForeignKey
ALTER TABLE "public"."Rental" ADD CONSTRAINT "Rental_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
