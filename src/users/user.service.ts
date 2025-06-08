import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateUserDtoType } from './dto/user.dto';
import { User } from '@prisma/client';
import { hashPassword } from '../utils/bcrypt';

@Injectable()
export class UserService {
  constructor(protected prismaService: PrismaService) {}

  async createUser(userData: CreateUserDtoType): Promise<User> {
    try {
      const { email, username, password } = userData;

      const checkUser = await this.prismaService.user.findUnique({
        where: { email },
      });

      const checkUsername = await this.prismaService.user.findUnique({
        where: { username },
      });

      if (checkUser || checkUsername) {
        throw new NotFoundException(`User already exists`);
      }

      const hashedPassword = hashPassword(password);
      const payload = new CreateUserDtoType(
        userData.username,
        userData.email,
        userData.name,
        hashedPassword,
      );

      return await this.prismaService.user.create({
        data: payload,
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

      const updateData = { ...userData };

      if (updateData.password) {
        updateData.password = hashPassword(updateData.password);
      }

      return await this.prismaService.user.update({
        where: { id },
        data: updateData,
      });
    } catch (e) {
      throw e;
    }
  }
}
