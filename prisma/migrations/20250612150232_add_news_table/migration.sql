-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('draft', 'published', 'archived');

-- CreateTable
CREATE TABLE "posts" (
    "id" UUID NOT NULL,
    "author_id" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "tag" JSONB DEFAULT '[]',
    "status" "PostStatus" NOT NULL DEFAULT 'draft',
    "content" JSONB NOT NULL DEFAULT '[]',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
