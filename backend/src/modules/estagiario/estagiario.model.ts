import type { IEstagiario, ICreateEstagiarioDTO } from "./estagiario.types.js";

const tabelaEstagiarios: IEstagiario[] = [];
let contadorId = 1;

class EstagiarioModel {
  public async create(dados: ICreateEstagiarioDTO): Promise<IEstagiario> {
    const novoEstagiario: IEstagiario = {
      id: contadorId++,
      ...dados,
      createdAt: new Date(),
    };

    tabelaEstagiarios.push(novoEstagiario);
    return novoEstagiario;
  }

  public async findByUsuarioId(usuarioId: number): Promise<IEstagiario | undefined> {
    return tabelaEstagiarios.find((est) => est.usuarioId === usuarioId);
  }
}

export default new EstagiarioModel();
