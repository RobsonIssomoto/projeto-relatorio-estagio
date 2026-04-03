import "dotenv/config";
import app from "./app.js";
import database from "./config/database.js";
import relatorioRoutes from "./modules/relatorio/relatorio.routes.js";
app.use("/relatorios", relatorioRoutes);

const PORT = process.env.PORT || 3000;

async function startServer(): Promise<void> {
  await database.connect();
  app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
  });
}

startServer();
