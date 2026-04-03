import { Router } from "express";
import relatorioController from "./relatorio.controller.js";

const relatorioRoutes = Router();

relatorioRoutes.post("/", relatorioController.create);
relatorioRoutes.get("/", relatorioController.findAll);
relatorioRoutes.get("/:id", relatorioController.findById);
relatorioRoutes.put("/:id", relatorioController.update);
relatorioRoutes.delete("/:id", relatorioController.delete);

export default relatorioRoutes;
