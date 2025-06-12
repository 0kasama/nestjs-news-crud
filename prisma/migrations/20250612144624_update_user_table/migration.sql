-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('user', 'moderator', 'admin');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "UserRoles" NOT NULL DEFAULT 'user';
