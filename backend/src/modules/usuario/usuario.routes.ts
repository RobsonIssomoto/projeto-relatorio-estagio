import { Router } from "express";
import { UsuarioController } from "./usuario.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastra um novo usuário no sistema
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Login:
 *                 type: string
 *                 example: joao.silva@estagiario.com
 *               Email:
 *                 type: string
 *                 example: joao.silva@estagiario.com
 *               Senha:
 *                 type: string
 *                 example: senha123
 *               Perfil:
 *                 type: number
 *                 example: 1
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso.
 */


usuarioRoutes.post("/", usuarioController.criar);
usuarioRoutes.get("/perfil", authMiddleware, usuarioController.buscar);
usuarioRoutes.put("/perfil", authMiddleware, usuarioController.editar);

export default usuarioRoutes;
