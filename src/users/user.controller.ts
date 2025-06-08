import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDtoType } from './dto/user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDtoType): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User | null> {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<CreateUserDtoType>,
  ): Promise<User> {
    return this.userService.updateUser(id, userData);
  }
}
