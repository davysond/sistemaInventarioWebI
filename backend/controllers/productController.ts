import { Request, Response } from 'express';
import * as productService from '../services/productService';
import { filterNulls } from '../utils/utils';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, price, categoryId } = req.body;

    if (!name || !price) {
      res.status(400).json({ error: 'Name and price are required' });
      return;
    }

    const product = await productService.createProduct({
      name,
      description,
      price,
      categoryId,
    });

    const filteredProduct = filterNulls(product);
    res.status(201).json(filteredProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Error creating product' });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProductsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const products = await productService.getProductsByUserId(Number(userId));
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.updateProduct(Number(id), req.body);
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await productService.deleteProduct(Number(id));
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
