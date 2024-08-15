import { Router } from 'express';
import * as userController from '../controllers/userController';
import * as productController from '../controllers/productController';
import * as orderController from '../controllers/orderController';
import * as orderItemController from '../controllers/orderItemController';
import * as categoryController from '../controllers/categoryController';

const router = Router();

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
 *     description: Creates a new order and optionally adds items to it. The total amount is calculated automatically based on the order items.
 *     requestBody:
 *       description: Order details including userId and optional orderItems
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
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
 *       '400':
 *         description: Bad request (e.g., missing userId or orderItems)
 *       '500':
 *         description: Internal server error
 */
router.post('/orders', orderController.createOrder);

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

export default router;
