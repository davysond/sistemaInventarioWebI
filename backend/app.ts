import express from 'express';
import routes from './routes/routes';
import cors from 'cors';
import { setupSwagger } from './configs/swaggerConfig';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Permite requisições apenas do front-end em localhost:3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));

app.use(express.json());

setupSwagger(app);

app.use('/', routes);

export default app;
