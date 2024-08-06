// src/repositories/userRepository.ts

import prisma from '../infraestructure/prismaClient';

export const getAllUsers = async () => {
  return await prisma.user.findMany();
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({ where: { id } });
};
