import { Router } from "express";
import relatorioRoutes from "./modules/relatorio/relatorio.routes.js";

const router = Router();

router.get("/teste", (request, response) => {
  return response.status(200).json({
    message: "Endpoint de teste funcionando",
  });
});

router.use("/relatorios", relatorioRoutes);

export default router;
