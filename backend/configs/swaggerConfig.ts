import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

export const setupSwagger = (app: Express) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Sistema de Inventário - Web I",
        version: "0.1",
      },
      servers: [
        {
          url: "http://localhost:3001",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT', 
          },
        },
      },
      security: [
        {
          bearerAuth: [],
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
