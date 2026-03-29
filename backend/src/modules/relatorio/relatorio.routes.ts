import { Router } from "express";
import relatorioController from "./relatorio.controller.js";

const relatorioRoutes = Router();

relatorioRoutes.post("/", relatorioController.create);
relatorioRoutes.get("/", relatorioController.findAll);

export default relatorioRoutes;
