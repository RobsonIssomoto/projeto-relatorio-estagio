import type { Request, Response } from "express";
import { UsuarioService } from "./usuario.service.js";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";

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

  async buscar(request: AuthRequest, response: Response) {
    const id = request.usuarioLogado?.id;

    if (!id) return response.status(401).json({ erro: "Usuário não identificado" });

    try {
      const usuario = await usuarioService.buscarUsuarioPorId(id);
      return response.status(200).json(usuario);
    } catch (error) {
      return response.status(500).json({ erro: "Erro ao buscar usuário" });
    }
  }

  async editar(request: AuthRequest, response: Response) {
    const id = request.usuarioLogado?.id;

    if (!id) return response.status(401).json({ erro: "Acesso não autorizado" });

    try {
      const usuarioAtualizado = await usuarioService.atualizarUsuario(id, request.body);
      return response.status(200).json(usuarioAtualizado);
    } catch (error) {
      return response.status(400).json({ erro: "Erro ao atualizar dados" });
    }
  }
}
