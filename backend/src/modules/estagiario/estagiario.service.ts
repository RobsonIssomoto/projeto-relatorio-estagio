import estagiarioModel from "./estagiario.model.js";
import type { ICreateEstagiarioDTO, IEstagiario } from "./estagiario.types.js";

class EstagiarioService {
  public async create(dados: ICreateEstagiarioDTO): Promise<IEstagiario> {
    // O Mongoose cria e salva no MongoDB
    const novoEstagiario = await estagiarioModel.create(dados);

    return novoEstagiario.toObject() as IEstagiario;
  }

  public async findByUsuarioId(usuarioId: string): Promise<IEstagiario | null> {
    return await estagiarioModel.findOne({ usuarioId }).lean<IEstagiario>();
  }
}

export default new EstagiarioService();
