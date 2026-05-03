import type { Request, Response } from "express";
import { UsuarioService } from "./usuario.service.js";

const usuarioService = new UsuarioService();

export class UsuarioController {
  async criar(request: Request, ressponse: Response) {
    try {
      // Chama o Service passando o JSON que veio no Body
      const novoUsuario = await usuarioService.criarUsuario(request.body);

      // Desestruturação para remover a senha do objeto de retorno (Boa Prática de Segurança)
      const { Senha, ...usuarioSemSenha } = novoUsuario;

      ressponse.status(201).json({
        mensagem: "Usuário criado com sucesso no SQL Server!",
        usuario: usuarioSemSenha,
      });
    } catch (error: any) {
      console.error("Erro no Controller de Usuário:", error);
      ressponse.status(500).json({
        erro: "Falha ao criar usuário",
        detalhes: error.message,
      });
    }
  }
}
