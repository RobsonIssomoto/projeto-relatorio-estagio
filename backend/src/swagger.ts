import swaggerJsDoc from "swagger-jsdoc";
import type { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API - Sistema de Gestão de Estágios",
      version: "1.0.0",
      description: "Documentação básica dos endpoints do sistema",
    },
    servers: [
      {
        url: "http://localhost:3000", // A porta que a API roda localmente
        description: "Servidor Local",
      },
    ],
    // ==========================================
    // 1. CONFIGURAÇÃO DE SEGURANÇA (TOKEN JWT)
    // ==========================================
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    // Aplica o cadeado em todas as rotas
    security: [
      {
        bearerAuth: [],
      },
    ],
    // ==========================================
  },
  apis: ["./src/modules/**/*.routes.ts", "./src/modules/**/*.routes.js"],
};

export const swaggerSpec = swaggerJsDoc(swaggerOptions);
