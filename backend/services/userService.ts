import { User } from '@prisma/client';
import * as userRepository from '../repositories/userRepository';

export const createUser = async (data: {
  name: string;
  email: string;
  products?: {
    name: string;
    description?: string;
    price: number;
  }[];
}): Promise<User> => {

  if (!data.name || !data.email) {
    throw new Error('Name and email are required');
  }

  return await userRepository.createUser(data);
}

export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
};