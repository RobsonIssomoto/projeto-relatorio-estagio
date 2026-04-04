import estagiarioModel from "./estagiario.model.js";
import type { ICreateEstagiarioDTO } from "./estagiario.types.js";

class EstagiarioService {
  public async create(dados: ICreateEstagiarioDTO) {
    // Se no futuro precisar validar regras (ex: CPF válido), o código entra aqui

    // O Service passa os dados para a Model (que guarda no array/banco)
    const novoEstagiario = await estagiarioModel.create(dados);

    console.log("Perfil de Estagiário criado com sucesso:", novoEstagiario);

    return novoEstagiario;
  }
}

export default new EstagiarioService();
