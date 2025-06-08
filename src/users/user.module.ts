import { Module } from '@nestjs/common';
import { UsersController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from '../common/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
