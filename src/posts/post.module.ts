import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  providers: [PostService],
  controllers: [PostController, PrismaService]
})
export class PostModule {}
