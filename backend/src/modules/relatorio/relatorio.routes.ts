// D:\PI-4Semestre\projeto-relatorio-estagio\backend\src\modules\relatorio\relatorio.routes.ts

import { Router } from "express";
import relatorioController from "./relatorio.controller.js";
import { verificarToken } from "../../middlewares/auth.middleware.js";

const relatorioRoutes = Router();

// 1. Rotas específicas/estáticas
// Rota para o aluno buscar os próprios relatórios via Token
relatorioRoutes.get("/aluno", verificarToken, relatorioController.findByUser);

// Rota para ADM/Professor buscar relatórios de um aluno específico
relatorioRoutes.get("/aluno/:alunoId", verificarToken, relatorioController.findAll);

// 2. Rotas dinâmicas (que usam :id)
// O Express só chegará aqui se a URL não for "/aluno"
relatorioRoutes.get("/:id", verificarToken, relatorioController.findById);

// 3. Outras operações
relatorioRoutes.post("/", verificarToken, relatorioController.create);
relatorioRoutes.put("/:id", verificarToken, relatorioController.update);
relatorioRoutes.delete("/:id", verificarToken, relatorioController.delete);

export default relatorioRoutes;
