import { Request, Response } from 'express';
import * as userService from '../services/userService';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, products } = req.body;

    // Validação básica dos dados
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Name, email, and password are required' });
      return;
    }

    // Chama o serviço para criar o usuário
    const user = await userService.createUser({
      name,
      email,
      password,
      products,
    });

    // Responde com o usuário criado
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);  // Log para depuração
    res.status(500).json({ error: 'Error creating user' });
  }
};

/**
   * Promove um usuário para administrador.
   * @param req - A requisição HTTP.
   * @param res - A resposta HTTP.
   */

export const promoteUserToAdmin = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // Chama o serviço para promover o usuário
    const updatedUser = await userService.promoteUserToAdmin(Number(userId));
    return res.status(200).json(updatedUser);
  } catch (error) {
    // Retorna um erro 500 em caso de falha
    return res.status(500).json({ error: 'Failed to promote user to admin'});
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminUserId = req.body.adminUserId; // ID do administrador que está fazendo a solicitação
    const userId = req.body.userId; // ID do usuário a ser deletado

    if (!adminUserId || !userId) {
      res.status(400).json({ error: 'Both adminUserId and userId are required' });
      return;
    }

    await userService.deleteUser(adminUserId, userId);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting user' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(Number(id));
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};