-- AlterTable
ALTER TABLE "Sector" ALTER COLUMN "deleted" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ServiceOrder" ALTER COLUMN "deleted" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "deleted" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserToSector" ALTER COLUMN "deleted" DROP DEFAULT;

-- AlterTable
ALTER TABLE "UserToServiceOrder" ALTER COLUMN "deleted" DROP DEFAULT;
