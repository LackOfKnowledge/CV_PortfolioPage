-- AlterTable
ALTER TABLE "User" ADD COLUMN     "hashedPassword" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';
