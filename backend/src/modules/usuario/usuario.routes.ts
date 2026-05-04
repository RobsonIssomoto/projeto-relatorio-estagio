import { Router } from "express";
import { UsuarioController } from "./usuario.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

usuarioRoutes.post("/", usuarioController.criar);
usuarioRoutes.get("/perfil", authMiddleware, usuarioController.buscar);
usuarioRoutes.put("/perfil", authMiddleware, usuarioController.editar);

export default usuarioRoutes;
