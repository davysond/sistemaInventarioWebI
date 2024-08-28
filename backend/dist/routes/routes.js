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
const orderController = __importStar(require("../controllers/orderController"));
const orderItemController = __importStar(require("../controllers/orderItemController"));
const categoryController = __importStar(require("../controllers/categoryController"));
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
 *               password:
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
 * /users/login:
 *   post:
 *     summary: User login
 *     description: Authenticates a user and returns a JWT token.
 *     requestBody:
 *       description: User credentials for authentication
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               password:
 *                 type: string
 *                 example: testPassword*
 *     responses:
 *       '200':
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 *       '401':
 *         description: Authentication failed (invalid credentials)
 */
router.post('/users/login', userController.loginUser);
/**
 * @swagger
 * /users/{userId}/promote:
 *   post:
 *     summary: Promote a user to admin
 *     description: Promotes a user to admin status and includes their associated products and orders.
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
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
router.post('/users/:userId/promote', userController.promoteUserToAdmin);
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
 *               categoryId:
 *                 type: number
 *                 example: 1
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
/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order with optional order items
 *     description: Creates a new order and optionally adds items to it. The total amount is calculated automatically based on the order items. You must specify the payment method, and you can optionally specify the payment status.
 *     requestBody:
 *       description: Order details including userId, paymentMethod, and optional orderItems and paymentStatus
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               paymentMethod:
 *                 type: string
 *                 enum:
 *                   - CREDIT_CARD
 *                   - DEBIT_CARD
 *                   - PAYPAL
 *                   - BANK_TRANSFER
 *                 example: CREDIT_CARD
 *               paymentStatus:
 *                 type: string
 *                 enum:
 *                   - PENDING
 *                   - COMPLETED
 *                   - FAILED
 *                 example: PENDING
 *               orderItems:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *     responses:
 *       '201':
 *         description: Order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 userId:
 *                   type: integer
 *                   example: 1
 *                 totalAmount:
 *                   type: number
 *                   format: float
 *                   example: 59.99
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-08-16T00:00:00Z
 *                 paymentMethod:
 *                   type: string
 *                   example: CREDIT_CARD
 *                 paymentStatus:
 *                   type: string
 *                   example: PENDING
 *                 orderItems:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       productId:
 *                         type: integer
 *                         example: 1
 *                       quantity:
 *                         type: integer
 *                         example: 2
 *                       price:
 *                         type: number
 *                         format: float
 *                         example: 29.99
 *       '400':
 *         description: Bad request (e.g., missing userId, paymentMethod, or invalid data)
 *       '500':
 *         description: Internal server error
 */
router.post('/orders', orderController.createOrder);
/**
 * @swagger
 * /orders/{orderId}/payment:
 *   post:
 *     summary: Finalize the payment for an existing order
 *     description: Updates the payment status of an existing order to COMPLETED.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order to finalize payment for
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Payment finalized successfully
 *       '400':
 *         description: Bad request (e.g., invalid order ID)
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */
router.post('/orders/:orderId/payment', orderController.finishPayment);
/**
 * @swagger
 * /order-items/{orderId}/items:
 *   post:
 *     summary: Add an item to an existing order
 *     description: Adds a new item to an existing order. The total amount of the order is updated automatically.
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         description: The ID of the order to which the item should be added
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       description: Order item details including productId and quantity
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productId:
 *                 type: integer
 *                 example: 1
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       '201':
 *         description: Order item added successfully
 *       '400':
 *         description: Bad request (e.g., missing productId or quantity)
 *       '404':
 *         description: Order or product not found
 *       '500':
 *         description: Internal server error
 */
router.post('/order-items/:orderId', orderItemController.addOrderItem);
/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders
 *     description: Retrieves a list of all orders in the system.
 *     responses:
 *       '200':
 *         description: List of all orders
 *       '500':
 *         description: Internal server error
 */
router.get('/orders', orderController.getAllOrders);
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get order by ID
 *     description: Retrieves a specific order by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       '200':
 *         description: Order found
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */
router.get('/orders/:id', orderController.getOrderById);
/**
 * @swagger
 * /orders:
 *   delete:
 *     summary: Delete an order
 *     description: Deletes an order by its ID.
 *     requestBody:
 *       description: Order ID of the order to be deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Order deleted successfully
 *       '400':
 *         description: Bad request (e.g., missing orderId)
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/orders', orderController.deleteOrder);
/**
 * @swagger
 * /order-items:
 *   delete:
 *     summary: Delete an order item
 *     description: Deletes an order item by its ID.
 *     requestBody:
 *       description: Order item ID of the item to be deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderItemId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Order item deleted successfully
 *       '400':
 *         description: Bad request (e.g., missing orderItemId)
 *       '404':
 *         description: Order item not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/order-items', orderItemController.deleteOrderItem);
/**
 * @swagger
 * /category:
 *   post:
 *     summary: Create a new category
 *     description: Creates a new category with the specified name and description.
 *     requestBody:
 *       description: Category details including name and optional description
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: 'Electronics'
 *               description:
 *                 type: string
 *                 example: 'Devices and gadgets'
 *     responses:
 *       '201':
 *         description: Category created successfully
 *       '400':
 *         description: Bad request (e.g., missing name)
 *       '500':
 *         description: Internal server error
 */
router.post('/category', categoryController.createCategory);
/**
 * @swagger
 * /category:
 *   get:
 *     summary: Get all categories
 *     description: Retrieves a list of all categories in the system.
 *     responses:
 *       '200':
 *         description: List of all categories
 *       '500':
 *         description: Internal server error
 */
router.get('/category', categoryController.getAllCategories);
/**
 * @swagger
 * /category:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category by its ID.
 *     requestBody:
 *       description: Category ID of the category to be deleted
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *       '400':
 *         description: Bad request (e.g., missing categoryId)
 *       '404':
 *         description: Category not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/category', categoryController.deleteCategory);
exports.default = router;
