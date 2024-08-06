import * as userRepository from '../repositories/userRepository';

export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};

export const getUserById = async (id: number) => {
  return await userRepository.getUserById(id);
};