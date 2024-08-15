import { Request, Response } from 'express';
import * as categoryService from '../services/categoryService';

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;

    // Validação básica dos dados
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }

    // Chama o serviço para criar a categoria
    const category = await categoryService.createCategory({
      name,
      description
    });

    // Responde com a categoria criada
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);  // Log para depuração
    res.status(500).json({ error: 'Error creating category' });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { categoryId } = req.body;

    if (!categoryId) {
      res.status(400).json({ error: 'Category ID is required' });
      return;
    }

    await categoryService.deleteCategory(categoryId);
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting category' });
  }
};
