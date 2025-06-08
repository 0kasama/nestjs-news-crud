import { z, ZodObject } from 'zod';

const CreateUserDto = z.object({
  username: z
    .string({
      required_error: 'Username is required',
      invalid_type_error: 'Username must be a string',
    })
    .min(8, {
      message: 'Username too short, minimum 8 characters',
    }),
  email: z
    .string({
      required_error: 'Email is required',
      invalid_type_error: 'Email must be a string',
    })
    .email({ message: 'Email is invalid' }),
  name: z
    .string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    })
    .min(1, {
      message: 'Name is required',
    }),
  password: z
    .string({
      required_error: 'Password is required',
      invalid_type_error: 'Password must be a string',
    })
    .min(8, {
      message: 'Password too short, minimum 8 characters',
    }),
});

export class CreateUserDtoType {
  static schema: ZodObject<any> = CreateUserDto;

  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly name: string,
    public readonly password: string,
  ) {}
}