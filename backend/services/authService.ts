import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authConfig } from '../configs/authConfig';

const prisma = new PrismaClient();

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error('User not found');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  // Gera um token JWT
  const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });

  return { token };
};
