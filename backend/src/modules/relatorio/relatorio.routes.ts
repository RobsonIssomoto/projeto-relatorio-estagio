import { Router } from "express";
import relatorioController from "./relatorio.controller.js";

const relatorioRoutes = Router();

relatorioRoutes.post("/", relatorioController.create);

export default relatorioRoutes;
