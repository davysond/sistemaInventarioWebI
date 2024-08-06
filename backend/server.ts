import express from 'express';
import * as userController from './controllers/userController';
import * as productController from './controllers/productController';

const app = express();

app.use(express.json());

// Rotas de usuários
app.post('/users/createUser', userController.createUser);
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);

// Rotas de produtos
app.get('/products', productController.getAllProducts);
app.get('/productsByUserId/:userId', productController.getProductsByUserId);
app.post('/products/createProduct', productController.createProduct);
app.put('/products/:id', productController.updateProduct);
app.delete('/products/:id', productController.deleteProduct);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
