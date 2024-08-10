import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

// Função para configurar o Swagger
export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0", 
      info: {
        title: "Sistema de Inventário - Web I",
        version: "0.1"
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.ts"], 
  };

  const specs = swaggerJsdoc(options);

  app.use(
    "/api-sistemaInventarioWebI",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );
};
