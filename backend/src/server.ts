import express from "express";
import app from "./app.js";
import { ENV } from "./config/env.js";
import databaseMongo from "./config/databaseMongo.js";
import { prisma, testarPrisma } from "./config/databasePrisma.js";
// import { executarSeeders } from "./config/seed.js";

// Importação das rotas
import relatorioRoutes from "./modules/relatorio/relatorio.routes.js";
import usuarioRoutes from "./modules/usuario/usuario.routes.js";
import authRoutes from "./modules/auth/auth.routes.js";

// Garante que o Express entenda o JSON
app.use(express.json());

// Plugando as rotas oficiais
app.use("/relatorios", relatorioRoutes);
app.use("/usuarios", usuarioRoutes); // Rota de usuários!
app.use("/auth", authRoutes);

const PORT = ENV.PORT || 3000;

async function startServer(): Promise<void> {
  await databaseMongo.connect();
  await testarPrisma(); // Conexão com SQL via Prisma
  // await executarSeeders();

  app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
  });
}

startServer();
