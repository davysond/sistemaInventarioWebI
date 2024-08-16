"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUsers = exports.deleteUser = exports.promoteUserToAdmin = exports.createUser = void 0;
const userService = __importStar(require("../services/userService"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error creating user:', error); // Log para depuração
        res.status(500).json({ error: 'Error creating user' });
    }
};
exports.createUser = createUser;
/**
   * Promove um usuário para administrador.
   * @param req - A requisição HTTP.
   * @param res - A resposta HTTP.
   */
const promoteUserToAdmin = async (req, res) => {
    try {
        const { userId } = req.params;
        // Chama o serviço para promover o usuário
        const updatedUser = await userService.promoteUserToAdmin(Number(userId));
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        // Retorna um erro 500 em caso de falha
        return res.status(500).json({ error: 'Failed to promote user to admin' });
    }
};
exports.promoteUserToAdmin = promoteUserToAdmin;
const deleteUser = async (req, res) => {
    try {
        const adminUserId = req.body.adminUserId; // ID do administrador que está fazendo a solicitação
        const userId = req.body.userId; // ID do usuário a ser deletado
        if (!adminUserId || !userId) {
            res.status(400).json({ error: 'Both adminUserId and userId are required' });
            return;
        }
        await userService.deleteUser(adminUserId, userId);
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
};
exports.deleteUser = deleteUser;
const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
exports.getAllUsers = getAllUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getUserById(Number(id));
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};
exports.getUserById = getUserById;
