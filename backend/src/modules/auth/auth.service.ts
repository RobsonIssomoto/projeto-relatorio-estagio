import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import usuarioModel from "../usuario/usuario.model.js";

//
// Em produção, isso fica no arquivo .env!
const SEGREDO_JWT = process.env.JWT_SECRET || "minha_chave_super_secreta_fatec_2024";

class AuthService {
  public async login(email: string, senhaEmTextoPlano: string) {
    console.log(`[LOGIN] Tentando acessar com e-mail: ${email}`);
    // 1. O usuário existe?
    const usuario = await usuarioModel.findByEmail(email);
    console.log(`[LOGIN] Usuário encontrado no banco:`, usuario);
    if (!usuario) {
      throw new Error("E-mail ou senha inválidos.");
    }
    console.log(`[LOGIN] Comparando senha digitada com o Hash salvo: ${usuario.senhaHash}`);
    // 2. A senha está correta? (O bcrypt compara o texto com o Hash do banco)
    const senhaValida = await bcrypt.compare(senhaEmTextoPlano, usuario.senhaHash);
    if (!senhaValida) {
      throw new Error("E-mail ou senha inválidos.");
    }

    // 3. Gerar o Passaporte (JWT)
    // O que vai dentro do payload é público, NUNCA coloque a senha aqui.
    const payload = {
      id: usuario.id,
      perfil: usuario.perfil,
    };

    const token = jwt.sign(payload, SEGREDO_JWT, { expiresIn: "8h" });

    // 4. Devolver o usuário seguro e o token
    const { senhaHash, ...usuarioSeguro } = usuario;

    return {
      usuario: usuarioSeguro,
      token,
    };
  }
}

export default new AuthService();
