import express from 'express';
import routes from './routes/routes';
import cors from 'cors';
import { setupSwagger } from './configs/swaggerConfig';

const app = express();

app.use(express.json());

// Configuração do Swagger
setupSwagger(app);

app.use('/', routes);
app.use(cors()); 

export default app;
