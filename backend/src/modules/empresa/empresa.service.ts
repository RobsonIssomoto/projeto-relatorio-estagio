import empresaModel from "./empresa.model.js";
import type { ICreateEmpresaDTO, IEmpresa } from "./empresa.types.js";

class EmpresaService {
  public async create(dados: ICreateEmpresaDTO): Promise<IEmpresa> {
    // salva de  no Atlas!
    const novaEmpresa = await empresaModel.create(dados);
    return novaEmpresa.toObject() as IEmpresa;
  }

  public async findByUsuarioId(usuarioId: string): Promise<IEmpresa | null> {
    return await empresaModel.findOne({ usuarioId }).lean<IEmpresa>();
  }
}

export default new EmpresaService();
