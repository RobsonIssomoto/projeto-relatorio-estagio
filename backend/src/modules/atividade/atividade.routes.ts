import { Router } from "express";
import atividadeController from "./atividade.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const atividadeRoutes = Router();

/**
 * @swagger
 * /atividades/aluno:
 *   get:
 *     summary: Lista as atividades do aluno logado (usando o Token)
 *     tags: [Atividades]
 *     responses:
 *       200:
 *         description: Lista de atividades retornada com sucesso.
 *       401:
 *         description: Token não fornecido ou inválido.
 */

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

/**
 * @swagger
 * /atividades:
 *   post:
 *     summary: Cria uma nova atividade de estágio
 *     tags: [Atividades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Desenvolvimento da tela de Login
 *               horas:
 *                 type: number
 *                 example: 4
 *               descricao:
 *                 type: string
 *                 example: Criação da interface utilizando React.
 *               dataAtividade:
 *                 type: string
 *                 format: date
 *                 example: 2026-06-03
 *               tecnologias:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [React, TypeScript]
 *     responses:
 *       201:
 *         description: Atividade criada com sucesso.
 */

// Todas as rotas passam pelo "Segurança" (authMiddleware)
// O aluno cria a atividade e o sistema sabe quem ele é pelo Token
atividadeRoutes.post("/", authMiddleware, atividadeController.create);

// Rotas de edição e exclusão protegidas
atividadeRoutes.put("/:id", authMiddleware, atividadeController.update);
atividadeRoutes.delete("/:id", authMiddleware, atividadeController.delete);

export default atividadeRoutes;
