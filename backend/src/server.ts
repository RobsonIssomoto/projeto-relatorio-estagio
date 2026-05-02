import express from "express";
import app from "./app.js";
import { ENV } from "./config/env.js";
import databaseMongo from "./config/databaseMongo.js";
import databaseSql from "./config/databaseSql.js";
import { prisma, testarPrisma } from "./config/databasePrisma.js";
import { executarSeeders } from "./config/seed.js";
import relatorioRoutes from "./modules/relatorio/relatorio.routes.js";

// Garante que o Express entenda o JSON do Postman
app.use(express.json()); 

// ============================================================================
// 🚨🚨🚨 INÍCIO DO CÓDIGO TEMPORÁRIO (APAGAR APÓS O TESTE) 🚨🚨🚨
// ============================================================================
app.post("/teste-sql", async (req, res) => {
  try {
    const dadosDoPostman = req.body;

    // ATENÇÃO: Confirme se 'usuarios' é o nome exato do seu model
    const novoRegistro = await prisma.usuarios.create({
      data: dadosDoPostman,
    });

    res.status(201).json({
      mensagem: "🎉 Sucesso! Dado salvo no SQL Server!",
      registro: novoRegistro,
    });
  } catch (error) {
    console.error("Erro ao salvar:", error);
    res.status(500).json({ erro: "Falha ao salvar no banco", detalhes: error });
  }
});
// ============================================================================
// 🚨🚨🚨 FIM DO CÓDIGO TEMPORÁRIO 🚨🚨🚨
// ============================================================================

app.use("/relatorios", relatorioRoutes);

const PORT = ENV.PORT || 3000;

async function startServer(): Promise<void> {
  await databaseMongo.connect();
  //await databaseSql.connect();
  
  await testarPrisma(); // Teste de conexão Prisma (v7)
  await executarSeeders();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server rodando na porta ${PORT}`);
  });
}

startServer();