import empresaModel from "./empresa.model.js";
import type { ICreateEmpresaDTO } from "./empresa.types.js";

class EmpresaService {
  public async create(dados: ICreateEmpresaDTO) {
    const novaEmpresa = await empresaModel.create(dados);
    console.log("🏢 Perfil de Empresa criado com sucesso:", novaEmpresa);
    return novaEmpresa;
  }
}

export default new EmpresaService();
