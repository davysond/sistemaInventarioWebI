import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (data: {
  name: string;
  email: string;
  products?: {
    name: string;
    description?: string;
    price: number;
  }[];
}) => {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      products: {
        create: data.products?.map(product => ({
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
}

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    include: {
      products: true, // Inclui a lista de produtos associados a cada usuário
    },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: { id },
    include: {
      products: true, // Inclui a lista de produtos associados ao usuário
    },
  });
};
