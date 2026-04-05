import type { Request, Response } from "express";
import usuarioService from "./usuario.service.js";
import estagiarioService from "../estagiario/estagiario.service.js";
import empresaService from "../empresa/empresa.service.js";

class UsuarioController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      // 1. Desestruturação - Pegamos apenas o que importa
      const {
        email,
        senhaEmTextoPlano,
        perfil,
        nome,
        cpf, // Exclusivos do estagiário
        razaoSocial,
        cnpj,
        responsavel, // Exclusivos da empresa
        telefone, // Compartilhado pelos dois
      } = request.body;

      // 2. Passamos os campos desestruturados para o Service (Futuro SQL)
      const usuario = await usuarioService.create({
        email,
        senhaEmTextoPlano,
        perfil,
      });

      let dadosPerfil = null;
      const perfilFormatado = String(perfil).toUpperCase();

      if (perfilFormatado === "ESTAGIARIO") {
        dadosPerfil = await estagiarioService.create({
          usuarioId: usuario.id,
          nome,
          cpf,
          telefone,
        });
      } else if (perfilFormatado === "REPRESENTANTE") {
        dadosPerfil = await empresaService.create({
          usuarioId: usuario.id,
          razaoSocial,
          cnpj,
          responsavel,
          telefone,
        });
      }

      return response.status(201).json({
        ...usuario,
        perfilDetalhado: dadosPerfil,
      });
    } catch (error: any) {
      // try/catch apenas porque o Service do Usuário lança erros
      // (ex: "E-mail já existe" ou "Perfil Admin bloqueado")
      return response.status(400).json({ erro: error.message });
    }
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const usuarios = await usuarioService.findAll();
      return response.status(200).json(usuarios);
    } catch (error: any) {
      return response.status(500).json({ erro: "Erro ao listar usuários" });
    }
  }
}

export default new UsuarioController();
