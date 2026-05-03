// import bcrypt from "bcrypt";
// import UsuarioModel from "../modules/usuario/usuario.model.js";
// import { Perfil } from "../modules/usuario/usuario.types.js";

// export async function executarSeeders() {
//   try {
//     // Verifica se já existe QUALQUER usuário com perfil 4 (Supervisor)
//     const supervisorExiste = await UsuarioModel.findOne({ perfil: Perfil.Supervisor });

//     if (!supervisorExiste) {
//       console.log("Semeando o banco de dados: Criando Supervisor padrão...");

//       // Criptografa a senha padrão "123456"
//       const saltRounds = 10;
//       const senhaHash = await bcrypt.hash("123456", saltRounds);

//       // Cria o usuário direto no Mongoose
//       await UsuarioModel.create({
//         email: "supervisor@empresa.com",
//         senhaHash: senhaHash,
//         perfil: Perfil.Supervisor,
//       });

//       console.log("Supervisor criado com sucesso!");
//       console.log("E-mail: supervisor@empresa.com");
//       console.log("Senha: 123456");
//       console.log("-------------------------------------------------");
//     } else {
//       console.log("Seed: O banco de dados já possui um Supervisor.");
//     }
//   } catch (error) {
//     console.error("Erro ao executar o Seed:", error);
//   }
// }
