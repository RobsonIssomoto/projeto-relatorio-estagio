import { prisma } from "../../config/databasePrisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  async autenticar(email: string, senhaPlana: string) {
    // 1. Busca o usuário no SQL Server pelo E-mail
    const usuario = await prisma.usuarios.findUnique({
      where: { Email: email },
    });

    // Se não achar o usuário, para aqui
    if (!usuario) {
      throw new Error("Credenciais inválidas");
    }

    // 2. Compara a senha digitada com a senha criptografada do banco
    const senhaValida = await bcrypt.compare(senhaPlana, usuario.Senha);

    if (!senhaValida) {
      throw new Error("Credenciais inválidas"); // Mesma mensagem por segurança
    }

    // 3. Gera o "Crachá Digital" (JWT)
    // ATENÇÃO: Em produção, colocar essa chave "secreta" no seu arquivo .env
    const segredo = process.env.JWT_SECRET || "chave_super_secreta_do_projeto";
    const token = jwt.sign(
      {
        id: usuario.Id,
        perfil: usuario.Perfil,
      },
      segredo,
      { expiresIn: "1d" }, // Token vale por 1 dia
    );

    // 4. Remove a senha antes de devolver o usuário pro frontend
    const { Senha, ...usuarioSemSenha } = usuario;

    return {
      usuario: usuarioSemSenha,
      token,
    };
  }
}
