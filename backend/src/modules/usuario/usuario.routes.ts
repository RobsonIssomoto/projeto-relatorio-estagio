import { Router } from "express";
import { UsuarioController } from "./usuario.controller.js";

const usuarioRoutes = Router();
const usuarioController = new UsuarioController();

// Define POST na raiz dessa rota vai chamar a função 'criar'
usuarioRoutes.post("/", usuarioController.criar);

export default usuarioRoutes;
