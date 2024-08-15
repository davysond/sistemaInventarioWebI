import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createCategory = async (data: {
    name: string;
    description: string
  }) => {
    return await prisma.category.create({
      data: {
        name: data.name,
        description: data.description
      },
    });
  };
  
  export const getAllCategories = async () => {
    return await prisma.category.findMany({
      include: {
        products: true, // Inclui os produtos associados a cada categoria
      },
    });
  };
  
  export const updateCategory = async (categoryId: number, data: {
    name: string;
  }) => {
    return await prisma.category.update({
      where: { id: categoryId },
      data: {
        name: data.name,
      },
    });
  };
  
  export const deleteCategory = async (categoryId: number) => {
    return await prisma.category.delete({
      where: { id: categoryId },
    });
  };
  