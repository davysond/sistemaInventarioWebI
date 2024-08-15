import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (data: {
  name: string;
  description?: string;
  price: number;
  userId?: number;
  categoryId?: number;
}) => {
  const { name, description, price, userId, categoryId } = data;

  if (!name || !price) {
    throw new Error('Name and price are required');
  }

  return await prisma.product.create({
    data: {
      name,
      description: description || null,
      price,
      userId: userId || null,
      categoryId: categoryId || null,
    },
    include: {
      category: true, // Inclui categoria se estiver presente
    },
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
};

// Adicione mais métodos conforme necessário


export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductsByUserId = async (userId: number) => {
  return await prisma.product.findMany({ where: { userId } });
};

export const updateProduct = async (id: number, data: {
  name?: string;
  description?: string;
  price?: number;
}) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({ where: { id } });
};
