import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      // Pega o Email e Senha que o React enviou no Body
      const { Email, Senha } = req.body;

      if (!Email || !Senha) {
        return res.status(400).json({ erro: "Email e Senha são obrigatórios" });
      }

      // Chama o serviço passando os dados
      const resultado = await authService.autenticar(Email, Senha);

      // Se deu certo, devolve o usuário e o token (status 200 OK)
      return res.status(200).json({
        mensagem: "Login realizado com sucesso!",
        ...resultado,
      });
    } catch (error: any) {
      console.error("Erro no Login:", error.message);
      // Retorna 401 (Não Autorizado)
      return res.status(401).json({ erro: error.message });
    }
  }
}
