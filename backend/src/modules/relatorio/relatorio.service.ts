/*

Papel da Service
 
Reponsável por:
    -Criar 
    -Listar 
    -Buscar por id
    -Atualizar 
    -Excluir 

Concentra as operações e regras de negócio relacionado ao módulo 
------------------------------------------------------------------
O Service
    -Não recebe req e res
    -Não define rota
    -Não conhece protocolo HTTP
    -Responsável pela lógica

*/
import { Types } from "mongoose";
import Relatorio from "./relatorio.model.js";
import type { IRelatorio, ICreateRelatorioDTO, IUpdateRelatorioDTO } from "./relatorio.types.js";

class RelatorioService {
  public async create(data: ICreateRelatorioDTO) {
    const relatorio = await Relatorio.create({
      alunoId: new Types.ObjectId(data.alunoId),
      aluno: data.aluno,
      mesReferencia: data.mesReferencia,
      atividades: data.atividades || [],
      horasRealizadas: data.horasRealizadas,
      status: data.status,
    });

    return relatorio;
  }

  public async findAll(filtro: { alunoId?: string } = {}): Promise<IRelatorio[]> {
    return await Relatorio.find(filtro);
  }

  public async findById(id: string): Promise<IRelatorio | null> {
    return await Relatorio.findById(id);
  }

  public async update(id: string, data: IUpdateRelatorioDTO) {
    return await Relatorio.findByIdAndUpdate(id, data, {
      returnDocument: "after", // Diz pro Mongoose devolver o objeto JÁ atualizado
      runValidators: true, // Diz pro Mongoose testar as regras (ex: se o status é "Aprovado" mesmo)
    });
  }

  public async delete(id: string) {
    return await Relatorio.findByIdAndDelete(id);
  }
}

export default new RelatorioService();
