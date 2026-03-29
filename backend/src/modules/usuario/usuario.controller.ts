import type { Request, Response } from "express";
import usuarioService from "./usuario.service.js";

class UsuarioController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      // 1. Desestruturação (Padrão do Professor) - Pegamos apenas o que importa
      const { email, senhaEmTextoPlano, perfil } = request.body;

      // 2. Passamos os campos desestruturados para o Service
      const usuario = await usuarioService.create({
        email,
        senhaEmTextoPlano,
        perfil,
      });

      return response.status(201).json(usuario);
    } catch (error: any) {
      // Mantive o try/catch apenas porque o Service do Usuário lança erros
      // (ex: "E-mail já existe" ou "Perfil Admin bloqueado")
      return response.status(400).json({ erro: error.message });
    }
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const usuarios = await usuarioService.findAll();
      return response.status(200).json(usuarios);
    } catch (error: any) {
      return response.status(500).json({ erro: "Erro ao listar usuários" });
    }
  }
}

export default new UsuarioController();
