import * as bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS || 10;

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, saltRounds);
};

export const validatePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};
