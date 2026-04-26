import bcrypt from "bcrypt";
import UsuarioModel from "./usuario.model.js"; // Importa o modelo do Mongoose
import type { IUsuario, ICreateUsuarioDTO } from "./usuario.types.js";
import { Perfil } from "./usuario.types.js";

class UsuarioService {
  public async create(data: ICreateUsuarioDTO): Promise<Omit<IUsuario, "senhaHash">> {
    // 1. Regra de Negócio: Bloquear criação de perfis internos por vias públicas
    if (data.perfil === Perfil.Admin || data.perfil === Perfil.Orientador) {
      throw new Error("Perfis de Admin e Orientador não podem ser criados por esta rota.");
    }

    // 2. Regra de Negócio: E-mail único
    const emailExiste = await UsuarioModel.findOne({ email: data.email });
    if (emailExiste) {
      throw new Error("Este e-mail já está em uso.");
    }

    // 3. Criptografia da Senha (A mágica do seu antigo SetSenhaHash)
    const saltRounds = 10;
    const hash = await bcrypt.hash(data.senhaEmTextoPlano, saltRounds);
    console.log("Senha criptografada: ", hash);

    // 4. O Mongoose cria e já salva no banco
    const novoUsuario = await UsuarioModel.create({
      email: data.email,
      perfil: data.perfil,
      senhaHash: hash,
    });

    // O Mongoose retorna um Documento. Para remover campos, é melhor converter para objeto puro (lean/toObject)
    const usuarioObjeto = novoUsuario.toObject() as IUsuario;
    const { senhaHash, ...usuarioSeguro } = usuarioObjeto;

    return usuarioSeguro;
  }

  public async findAll(): Promise<Omit<IUsuario, "senhaHash">[]> {
    const usuarios = await UsuarioModel.find().lean<IUsuario[]>();
    return usuarios.map(({ senhaHash, ...usuarioSeguro }) => usuarioSeguro);
  }
}

export default new UsuarioService();
