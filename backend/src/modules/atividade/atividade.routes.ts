import { Router } from "express";
import atividadeController from "./atividade.controller.js"; // cite: 10
import { verificarToken } from "../../middlewares/auth.middleware.js"; // cite: 1

const atividadeRoutes = Router();

// O '?' permite que o alunoId seja opcional.
// Se não enviar, o Controller usa o ID do Token. Se enviar, usa o da URL.
// 1. Rota para quando o ID é enviado (Professor/ADM consultando um aluno)
atividadeRoutes.get("/aluno/:alunoId", verificarToken, atividadeController.findAllByAluno);

// 2. Rota para quando o ID NÃO é enviado (Aluno consultando a si mesmo pelo Token)
atividadeRoutes.get("/aluno", verificarToken, atividadeController.findAllByAluno);

// Busca uma atividade específica pelo ID do MongoDB
atividadeRoutes.get("/:id", verificarToken, atividadeController.findById);

// Rota para ADM ou Professor listar tudo
atividadeRoutes.get("/", verificarToken, atividadeController.findAll);

// Todas as rotas passam pelo "Segurança" (verificarToken)
// O aluno cria a atividade e o sistema sabe quem ele é pelo Token
atividadeRoutes.post("/", verificarToken, atividadeController.create);

// Rotas de edição e exclusão protegidas
atividadeRoutes.put("/:id", verificarToken, atividadeController.update);
atividadeRoutes.delete("/:id", verificarToken, atividadeController.delete);

export default atividadeRoutes;
