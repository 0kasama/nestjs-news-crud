import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateUserDtoType } from './dto/user.dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(protected prismaService: PrismaService) {}

  async createUser(userData: CreateUserDtoType): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: userData,
      });
    } catch (e) {
      throw e;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return await this.prismaService.user.findMany();
    } catch (e) {
      throw e;
    }
  }

  async getUserById(id: string): Promise<User | null> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User not found`);
      }
      return user;
    } catch (e) {
      throw e;
    }
  }

  async updateUser(
    id: string,
    userData: Partial<CreateUserDtoType>,
  ): Promise<User> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
      });

      if (!user) {
        throw new NotFoundException(`User not found`);
      }

      return await this.prismaService.user.update({
        where: { id },
        data: userData,
      });
    } catch (e) {
      throw e;
    }
  }
}
