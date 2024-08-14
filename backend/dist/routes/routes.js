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
const express_1 = require("express");
const userController = __importStar(require("../controllers/userController"));
const productController = __importStar(require("../controllers/productController"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /users/createUser:
 *   post:
 *     summary: Create a new user
 *     description: Creates a new user in the system.
 *     requestBody:
 *       description: User object that needs to be added
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               passoword:
 *                  type: string
 *                  example: testPassword*
 *     responses:
 *       '201':
 *         description: User created successfully
 *       '400':
 *         description: Bad request
 */
router.post('/users/createUser', userController.createUser);
/**
 * @swagger
 * /users/promoteAsAdmin:
 *   post:
 *     summary: Promote a user to administrator
 *     description: Promotes an existing user to administrator status in the system.
 *     requestBody:
 *       description: User ID of the user to be promoted to administrator
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: User promoted to administrator successfully
 *       '400':
 *         description: Bad request (e.g., missing userId)
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.post('/users/promoteToAdmin', userController.promoteUserToAdmin);
/**
 * @swagger
 * /users/delete:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user from the system. Only administrators can perform this action.
 *     requestBody:
 *       description: Admin user ID and user ID to be deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               adminUserId:
 *                 type: integer
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *       '400':
 *         description: Bad request (e.g., missing adminUserId or userId)
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/users/delete', userController.deleteUser);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Retrieves a list of all users.
 *     responses:
 *       '200':
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   email:
 *                     type: string
 *                     example: john.doe@example.com
 */
router.get('/users', userController.getAllUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Retrieve a specific user
 *     description: Retrieves details of a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: John Doe
 *                 email:
 *                   type: string
 *                   example: john.doe@example.com
 *       '404':
 *         description: User not found
 */
router.get('/users/:id', userController.getUserById);
// Rotas de produtos
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     description: Retrieves a list of all products.
 *     responses:
 *       '200':
 *         description: A list of products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Widget
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 19.99
 */
router.get('/products', productController.getAllProducts);
/**
 * @swagger
 * /productsByUserId/{userId}:
 *   get:
 *     summary: Retrieve products by user ID
 *     description: Retrieves a list of products associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: A list of products for the specified user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Widget
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 19.99
 *       '404':
 *         description: User not found
 */
router.get('/productsByUserId/:userId', productController.getProductsByUserId);
/**
 * @swagger
 * /products/createProduct:
 *   post:
 *     summary: Create a new product
 *     description: Creates a new product in the system.
 *     requestBody:
 *       description: Product object that needs to be added
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Widget
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 19.99
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '400':
 *         description: Bad request
 */
router.post('/products/createProduct', productController.createProduct);
/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Updates an existing product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Product object that needs to be updated
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Widget
 *               price:
 *                 type: number
 *                 format: float
 *                 example: 29.99
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '400':
 *         description: Bad request
 *       '404':
 *         description: Product not found
 */
router.put('/products/:id', productController.updateProduct);
/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Deletes an existing product by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '204':
 *         description: Product deleted successfully
 *       '404':
 *         description: Product not found
 */
router.delete('/products/:id', productController.deleteProduct);
exports.default = router;
