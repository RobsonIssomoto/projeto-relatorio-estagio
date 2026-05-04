import { Router } from "express";
import atividadeController from "./atividade.controller.js"; // cite: 10
import { authMiddleware } from "../../middlewares/auth.middleware.js"; // cite: 1

const atividadeRoutes = Router();

// O '?' permite que o alunoId seja opcional.
// Se não enviar, o Controller usa o ID do Token. Se enviar, usa o da URL.
// 1. Rota para quando o ID é enviado (Professor/ADM consultando um aluno)
atividadeRoutes.get("/aluno/:alunoId", authMiddleware, atividadeController.findAllByAluno);

// 2. Rota para quando o ID NÃO é enviado (Aluno consultando a si mesmo pelo Token)
atividadeRoutes.get("/aluno", authMiddleware, atividadeController.findAllByAluno);

// Busca uma atividade específica pelo ID do MongoDB
atividadeRoutes.get("/:id", authMiddleware, atividadeController.findById);

// Rota para ADM ou Professor listar tudo
atividadeRoutes.get("/", authMiddleware, atividadeController.findAll);

// Todas as rotas passam pelo "Segurança" (authMiddleware)
// O aluno cria a atividade e o sistema sabe quem ele é pelo Token
atividadeRoutes.post("/", authMiddleware, atividadeController.create);

// Rotas de edição e exclusão protegidas
atividadeRoutes.put("/:id", authMiddleware, atividadeController.update);
atividadeRoutes.delete("/:id", authMiddleware, atividadeController.delete);

export default atividadeRoutes;
