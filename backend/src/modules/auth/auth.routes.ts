import { Router } from "express";
import { AuthController } from "./auth.controller.js";

const authRoutes = Router();
const authController = new AuthController();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário no sistema (Aluno, Coordenador, Supervisor)
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Email:
 *                 type: string
 *                 example: carla.santos@estagiaria.com
 *               Senha:
 *                 type: string
 *                 example: "Teste@2026"
 *     responses:
 *       200:
 *         description: Login bem-sucedido. Retorna o Token JWT.
 *       400:
 *         description: E-mail ou senha inválidos.
 */

authRoutes.post("/login", authController.login);

export default authRoutes;
