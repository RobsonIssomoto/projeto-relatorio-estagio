import swaggerJsDoc from "swagger-jsdoc";
import type {Options} from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API - Sistema de Gestão de Estágios',
      version: '1.0.0',
      description: 'Documentação básica dos endpoints do sistema',
    },
    servers: [
      {
        url: 'http://localhost:3333', // A porta que a API roda localmente
        description: 'Servidor Local',
      },
    ],
  },
  apis: [
    "./src/modules/**/*.routes.ts", 
    "./src/modules/**/*.routes.js" 
  ],
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);