import type { IUsuario } from "./usuario.type.js";

const tabelaUsuarios: IUsuario[] = [];
let contadorId = 1;

class UsuarioModel {
  // Ignoramos id, createdAt e updatedAt na hora de receber os dados
  public async create(
    dadosMapeados: Omit<IUsuario, "id" | "createdAt" | "updatedAt">,
  ): Promise<IUsuario> {
    const novoUsuario: IUsuario = {
      id: contadorId++,
      ...dadosMapeados,
      createdAt: new Date(), // Preenchemos a data automaticamente aqui
    };

    tabelaUsuarios.push(novoUsuario);
    return novoUsuario;
  }

  public async findByEmail(email: string): Promise<IUsuario | undefined> {
    return tabelaUsuarios.find((usuario) => usuario.email === email);
  }

  public async findAll(): Promise<IUsuario[]> {
    return tabelaUsuarios;
  }
}

export default new UsuarioModel();
