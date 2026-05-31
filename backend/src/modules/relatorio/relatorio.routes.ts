// D:\PI-4Semestre\projeto-relatorio-estagio\backend\src\modules\relatorio\relatorio.routes.ts

import { Router } from "express";
import relatorioController from "./relatorio.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const relatorioRoutes = Router();

// 1. Rotas específicas/estáticas
// Rota para o aluno buscar os próprios relatórios via Token
relatorioRoutes.get("/aluno", authMiddleware, relatorioController.findByUser);

// Rota para ADM/Professor buscar relatórios de um aluno específico
relatorioRoutes.get("/aluno/:alunoId", authMiddleware, relatorioController.findAll);

// 2. Rotas dinâmicas (que usam :id)
// O Express só chegará aqui se a URL não for "/aluno"
relatorioRoutes.get("/:id", authMiddleware, relatorioController.findById);

// 3. Outras operações
relatorioRoutes.post("/", authMiddleware, relatorioController.create);
relatorioRoutes.put("/:id", authMiddleware, relatorioController.update);
relatorioRoutes.delete("/:id", authMiddleware, relatorioController.delete);

// Rota para listar na tela do supervisor
relatorioRoutes.get("/relatorios/supervisor/pendentes", authMiddleware, relatorioController.getPendentesSupervisor);

// Rota para os botões verde e vermelho
relatorioRoutes.put("/relatorios/:id/avaliar", authMiddleware, relatorioController.avaliar);
export default relatorioRoutes;
