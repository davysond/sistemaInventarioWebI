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
exports.deleteCategory = exports.getAllCategories = exports.createCategory = void 0;
const categoryService = __importStar(require("../services/categoryService"));
const createCategory = async (req, res) => {
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
    }
    catch (error) {
        console.error('Error creating category:', error); // Log para depuração
        res.status(500).json({ error: 'Error creating category' });
    }
};
exports.createCategory = createCategory;
const getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};
exports.getAllCategories = getAllCategories;
const deleteCategory = async (req, res) => {
    try {
        const { categoryId } = req.body;
        if (!categoryId) {
            res.status(400).json({ error: 'Category ID is required' });
            return;
        }
        await categoryService.deleteCategory(categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting category' });
    }
};
exports.deleteCategory = deleteCategory;
