import * as categoryRepository from '../repositories/categoryRepository';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const createCategory = async (data: {
  name: string;
  description: string
}) => {
  // Valida o nome da categoria
  if (!data.name) {
    throw new Error('Category name is required');
  }

  return await categoryRepository.createCategory(data);
};

export const getAllCategories = async () => {
  return await categoryRepository.getAllCategories();
};

export const updateCategory = async (categoryId: number, data: {
  name: string;
}) => {
  // Verifica se a categoria existe
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  return await categoryRepository.updateCategory(categoryId, data);
};

export const deleteCategory = async (categoryId: number) => {
  // Verifica se a categoria existe
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) {
    throw new Error('Category not found');
  }

  return await categoryRepository.deleteCategory(categoryId);
};
