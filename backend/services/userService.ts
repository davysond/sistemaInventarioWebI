import * as userRepository from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

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
  return await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      products: {
        create: products?.map(product => ({
          name: product.name,
          description: product.description,
          price: product.price
        })) || [], // Usa uma lista vazia se products não for fornecido
      },
    },
    include: {
      products: true, // Inclui a lista de produtos na resposta
    },
  });
};

export const promoteUserToAdmin = async (userId: number) => {
  try {
    return await userRepository.promoteUserToAdmin(userId);
  } catch (error) {
    throw new Error(`Failed to promote user to admin:`);
  }
};

export const deleteUser = async (adminUserId: number, userId: number) => {
  // Verifique se o administrador existe e se é um administrador
  const adminUser = await prisma.user.findUnique({
    where: { id: adminUserId },
  });

  if (!adminUser || !adminUser.isAdmin) {
    throw new Error('Unauthorized: Only administrators can delete users');
  }

  // Verifique se o usuário a ser deletado existe
  const userToDelete = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!userToDelete) {
    throw new Error('User not found');
  }

  return await userRepository.deleteUser(userId);
};

export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
};


