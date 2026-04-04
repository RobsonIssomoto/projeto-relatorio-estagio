import type { IEmpresa, ICreateEmpresaDTO } from "./empresa.types.js";

const tabelaEmpresas: IEmpresa[] = [];
let contadorId = 1;

class EmpresaModel {
  public async create(dados: ICreateEmpresaDTO): Promise<IEmpresa> {
    const novaEmpresa: IEmpresa = {
      id: contadorId++,
      ...dados,
      createdAt: new Date(),
    };

    tabelaEmpresas.push(novaEmpresa);
    return novaEmpresa;
  }
}

export default new EmpresaModel();
