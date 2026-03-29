import bcrypt from "bcrypt";
import usuarioModel from "./usuario.model.js";
import type { IUsuario, ICreateUsuarioDTO } from "./usuario.type.js";
import { Perfil } from "./usuario.type.js";

class UsuarioService {
  public async create(
    data: ICreateUsuarioDTO,
  ): Promise<Omit<IUsuario, "senhaHash">> {
    // 1. Regra de Negócio: Bloquear criação de perfis internos por vias públicas
    if (data.perfil === Perfil.Admin || data.perfil === Perfil.Orientador) {
      throw new Error(
        "Perfis de Admin e Orientador não podem ser criados por esta rota.",
      );
    }

    // 2. Regra de Negócio: E-mail único
    const emailExiste = await usuarioModel.findByEmail(data.email);
    if (emailExiste) {
      throw new Error("Este e-mail já está em uso.");
    }

    // 3. Criptografia da Senha (A mágica do seu antigo SetSenhaHash)
    const saltRounds = 10;
    const hash = await bcrypt.hash(data.senhaEmTextoPlano, saltRounds);
    console.log("Olha a senha criptografada aqui:", hash);

    // 4. Envia os dados validados e seguros para a Model salvar
    const novoUsuario = await usuarioModel.create({
      email: data.email,
      perfil: data.perfil,
      senhaHash: hash,
    });

    // 5. Retorna o usuário criado, mas arranca a senha do objeto por segurança
    const { senhaHash, ...usuarioSeguro } = novoUsuario;
    return usuarioSeguro;
  }

  public async findAll(): Promise<Omit<IUsuario, "senhaHash">[]> {
    const usuarios = await usuarioModel.findAll();

    // Remove o hash da senha de toda a lista antes de devolver para a tela
    return usuarios.map((usuario) => {
      const { senhaHash, ...usuarioSeguro } = usuario;
      return usuarioSeguro;
    });
  }
}

export default new UsuarioService();
