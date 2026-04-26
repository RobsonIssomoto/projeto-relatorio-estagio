import "dotenv/config";
import app from "./app.js";
import database from "./config/database.js";
import relatorioRoutes from "./modules/relatorio/relatorio.routes.js";
import { executarSeeders } from "./config/seed.js";
app.use("/relatorios", relatorioRoutes);

const PORT = process.env.PORT || 3000;

async function startServer(): Promise<void> {
  await database.connect();
  await executarSeeders();
  app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
  });
}

startServer();
