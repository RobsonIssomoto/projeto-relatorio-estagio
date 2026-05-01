import "dotenv/config";
import app from "./app.js";
import { ENV } from "./config/env.js";
import databaseMongo from "./config/databaseMongo.js";
import databaseSql from "./config/databaseSql.js";
import { executarSeeders } from "./config/seed.js";

import relatorioRoutes from "./modules/relatorio/relatorio.routes.js";
app.use("/relatorios", relatorioRoutes);

const PORT = process.env.PORT || 3000;

async function startServer(): Promise<void> {
  await databaseMongo.connect();
  await databaseSql.connect();
  await executarSeeders();
  app.listen(PORT, () => {
    console.log(`Server rodando na porta ${ENV.PORT}`);
  });
}

startServer();
