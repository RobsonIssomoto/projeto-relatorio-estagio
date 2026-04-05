import { Router } from "express";
import usuarioController from "./usuario.controller.js";
import { garantirAutenticacao } from "../../middlewares/auth.middleware.js";

const usuarioRoutes = Router();

// Rota para cadastrar (POST /api/v1/usuarios)
usuarioRoutes.post("/", usuarioController.create);

// Rota para listar (GET /api/v1/usuarios)
usuarioRoutes.get("/", garantirAutenticacao, usuarioController.findAll);

export default usuarioRoutes;
