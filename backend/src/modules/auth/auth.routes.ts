import { Router } from "express";
import { AuthController } from "./auth.controller.js";

const authRoutes = Router();
const authController = new AuthController();

// A rota será POST /auth/login
authRoutes.post("/login", authController.login);

export default authRoutes;
