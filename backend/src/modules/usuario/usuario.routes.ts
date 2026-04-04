import { Router } from "express";
import usuarioController from "./usuario.controller.js";

const usuarioRoutes = Router();


// Rota para cadastrar (POST /api/v1/usuarios)
usuarioRoutes.post("/", usuarioController.create);

// Rota para listar (GET /api/v1/usuarios)
usuarioRoutes.get("/", usuarioController.findAll);

export default usuarioRoutes;
