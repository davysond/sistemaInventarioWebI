import express from 'express';
import routes from './routes/routes';
import { setupSwagger } from './configs/swaggerConfig';

const app = express();

app.use(express.json());

// Configuração do Swagger
setupSwagger(app);

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
