import type { Request, Response } from "express";
import usuarioService from "./usuario.service.js";
import estagiarioService from "../estagiario/estagiario.service.js";
import empresaService from "../empresa/empresa.service.js";
import { Perfil } from "./usuario.types.js";

class UsuarioController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      // 1. Desestruturação - Pega apenas o que importa
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

      let perfilNumerico = perfil;

      // Traduz o texto para o número do Enum
      if (typeof perfil === "string") {
        const perfilFormatado = perfil.toUpperCase();
        if (perfilFormatado === "ESTAGIARIO") perfilNumerico = Perfil.Estagiario;
        else if (perfilFormatado === "REPRESENTANTE") perfilNumerico = Perfil.Representante;
      }

      // 2. Passa os campos desestruturados para o Service
      const usuario = await usuarioService.create({
        email,
        senhaEmTextoPlano,
        perfil: perfilNumerico, // <-- AQUI ESTAVA O ERRO! Tem que ser "chave: valor"
      });

      let dadosPerfil = null;

      // 3. Cria o perfil detalhado baseado no número
      if (perfilNumerico === Perfil.Estagiario) {
        dadosPerfil = await estagiarioService.create({
          usuarioId: usuario._id,
          nome,
          cpf,
          telefone,
        });
      } else if (perfilNumerico === Perfil.Representante) {
        dadosPerfil = await empresaService.create({
          usuarioId: usuario._id,
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
    } catch (error) {
      // Verifica se o erro é uma instância da classe Error nativa do Node
      if (error instanceof Error) {
        return response.status(400).json({ erro: error.message });
      }

      // Fallback de segurança caso algum erro bizarro que não seja da classe Error aconteça
      return response.status(500).json({ erro: "Erro interno desconhecido ao criar usuário." });
    }
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const usuarios = await usuarioService.findAll();
      return response.status(200).json(usuarios);
    } catch (error) {
      // Opcional: dar um console.error(error) para debugar no terminal,
      // mas para o Front-end, manter a mensagem genérica segura de erro 500.
      return response.status(500).json({ erro: "Erro ao listar usuários" });
    }
  }
}

export default new UsuarioController();
