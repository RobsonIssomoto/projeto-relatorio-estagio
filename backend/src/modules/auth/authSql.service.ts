import sql from "mssql";
import bcrypt from "bcrypt";

export const AuthServiceSql = {
  async login(email: string, senha: string) {
    try {
      const request = new sql.Request();

      //Busca usuário pelo email
      const result = await request
        .input("email", sql.NVarChar, email)
        .query("SELECT * FROM Usuarios WHERE Email = @email");

      const usuario = result.recordset[0];

      if (!usuario) {
        throw new Error("Usuário não encontrado no SQL Server");
      }

      const senhaValida = await bcrypt.compare(senha, usuario.Senha);

      if (!senhaValida) {
        throw new Error("Usuário ou senha incorreta");
      }

      return usuario; //Retorna os dados (Id, Login, Perfil, etc)
    } catch (error) {
      throw error;
    }
  },

  async cadastrar(login: string, email: string, senha: string, perfil: number) {
    try {
      //Criptografa senha antes de salvar
      const saltRounds = 10;
      const hash = await bcrypt.hash(senha, saltRounds);

      const request = new sql.Request();
      await request
        .input("login", sql.NVarChar, login)
        .input("email", sql.NVarChar, email)
        .input("senha", sql.NVarChar, hash)
        .input("perfil", sql.Int, perfil)
        .input("data", sql.DateTime2, new Date())
        .query(
          `INSERT INTO Usuarios (Login, Email, Senha, Perfil, DataCadastro) VALUES (@login, @email, @senha, @perfil, @data)`,
        );

      return { message: "Usuário cadastrado com sucesso no SQL" };
    } catch (error) {
      throw error;
    }
  },
};
