import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authConfig } from '../configs/authConfig';

const prisma = new PrismaClient();

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  products?: {
    name: string;
    description?: string;
    price: number;
  }[];
}) => {
  const { name, email, password, products } = data;

  // Criptografa a senha
  const hashedPassword = await bcrypt.hash(password, 10);

  // Cria o novo usuário e seus produtos associados
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      products: {
        create: products?.map(product => ({
          name: product.name,
          description: product.description,
          price: product.price
        })) || [],
      },
    },
    include: {
      products: true,
    },
  });

  // Gera um token JWT para o novo usuário
  const token = jwt.sign({ id: newUser.id, isAdmin: newUser.isAdmin }, authConfig.secret, {
    expiresIn: authConfig.expiresIn,
  });

  return { user: newUser, token };
};

export const promoteUserToAdmin = async (userId: number) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { isAdmin: true },
  });
};

export const deleteUser = async (userId: number) => {
  return await prisma.user.delete({
    where: { id: userId },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      products: true, // Inclui a lista de produtos associados a cada usuário
      orders: true
    },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      products: true, // Inclui a lista de produtos associados ao usuário
      orders: true
    },
  });
};
