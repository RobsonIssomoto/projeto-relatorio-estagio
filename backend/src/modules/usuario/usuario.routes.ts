import { Router } from "express";
import { UsuarioController } from "./usuario.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

/**
 * @swagger
 * /usuarios:
 * post:
 * summary: Cadastra um novo usuário no sistema
 * tags: [Usuários]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * nome:
 * type: string
 * example: "João Silva"
 * email:
 * type: string
 * example: "joao@fatec.sp.gov.br"
 * senha:
 * type: string
 * example: "senha123"
 * tipoPerfil:
 * type: string
 * example: "ALUNO"
 * responses:
 * 201:
 * description: Usuário criado com sucesso.
 */

usuarioRoutes.post("/", usuarioController.criar);
usuarioRoutes.get("/perfil", authMiddleware, usuarioController.buscar);
usuarioRoutes.put("/perfil", authMiddleware, usuarioController.editar);

export default usuarioRoutes;
