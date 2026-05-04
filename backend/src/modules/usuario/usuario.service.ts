import { prisma } from "../../config/databasePrisma.js";
import bcrypt from "bcrypt";
import type { CriarUsuarioDTO, EditarUsuarioDTO } from "./usuario.types.js";
import type { Prisma } from "@prisma/client";

export class UsuarioService {
  async criarUsuario(dados: CriarUsuarioDTO) {
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(dados.Senha, salt);
    const dataCadastroAtual = new Date();

    const { Email, Senha, Perfil, CPF, CNPJ, Nome, RazaoSocial, Telefone, ...rest } = dados;
    const cpfLimpo = CPF ? CPF.replace(/\D/g, "") : null;
    const cnpjLimpo = CNPJ ? CNPJ.replace(/\D/g, "") : null;
    const telefoneLimpo = Telefone ? Telefone.replace(/\D/g, "") : null;

    // 1. Trata os campos opcionais para que o Prisma (SQL Server) aceite
    // O operador ?? null transforma 'undefined' em 'null'
    const telefoneTratado = telefoneLimpo ?? null;
    const nomeCursoTratado = dados.NomeCurso ?? null;
    const razaoSocialTratada = dados.RazaoSocial ?? null;

    // 2. Cria o objeto de entrada usando a tipagem do Prisma
    const usuarioInput: Prisma.UsuariosCreateInput = {
      Login: dados.Login,
      Senha: senhaHash,
      Email: dados.Email,
      Perfil: dados.Perfil,
      DataCadastro: dataCadastroAtual,
    };

    // 3. Adiciona as relações de forma condicional
    // O uso de create: [{ ... }] (Array) por causa do schema []
    if (dados.Perfil === 2) {
      usuarioInput.Estagiarios = {
        create: [
          {
            Nome: dados.Nome,
            CPF: cpfLimpo || "",
            Email: dados.Email,
            Telefone: telefoneTratado,
            NomeCurso: nomeCursoTratado,
            DataCadastro: dataCadastroAtual,
          },
        ],
      };
    }
    // Direcionamento para Perfil 3 (Empresa/Representante)
    else if (dados.Perfil === 3) {
      usuarioInput.Empresas = {
        create: [
          {
            Nome: dados.Nome,
            CNPJ: cnpjLimpo || "",
            Email: dados.Email,
            RazaoSocial: razaoSocialTratada || dados.Nome,
            Telefone: telefoneTratado,
            DataCadastro: dataCadastroAtual,
          },
        ],
      };
    }

    // 4. Execução final com include para retornar os dados das tabelas filhas
    return await prisma.usuarios.create({
      data: usuarioInput,
      include: {
        Estagiarios: true,
        Empresas: true,
      },
    });
  }

  async buscarUsuarioPorId(id: number) {
    return await prisma.usuarios.findUnique({
      where: { Id: id },
      include: {
        Estagiarios: true,
        Empresas: true,
      },
    });
  }

  async atualizarUsuario(id: number, dados: EditarUsuarioDTO) {
    const { Nome, CPF, CNPJ, Telefone, ...rest } = dados;
    const telefoneLimpo = Telefone ? Telefone.replace(/\D/g, "") : undefined;

    const dadosPerfil = {
      ...(dados.Nome !== undefined && { Nome: dados.Nome }),
      ...(telefoneLimpo !== undefined && { Telefone: telefoneLimpo }),
    };

    return await prisma.usuarios.update({
      where: { Id: id },
      data: {
        // 3. Só entra nos blocos de updateMany se tiver algo para atualizar no perfil
        ...(Object.keys(dadosPerfil).length > 0 && {
          Estagiarios: {
            updateMany: {
              where: {},
              data: dadosPerfil,
            },
          },
          Empresas: {
            updateMany: {
              where: {},
              data: dadosPerfil,
            },
          },
        }),
      },
    });
  }
}
