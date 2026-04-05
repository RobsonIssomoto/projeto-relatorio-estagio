//Porta de entrada para o Axios
import type { Request, Response } from "express";
import authService from "./auth.service.js";

class AuthController {
  public async login(request: Request, response: Response): Promise<Response> {
    try {
      const { email, senha } = request.body;

      const resultado = await authService.login(email, senha);

      console.log(`Login aprovado para: ${email}`);
      return response.status(200).json(resultado);
    } catch (error: any) {
      // 401 (Unauthorized) quando a senha está errada
      return response.status(401).json({ erro: error.message });
    }
  }
}

export default new AuthController();
