import { Types } from "mongoose";
import type { IAtividade, ICreateAtividadeDTO, IUpdateAtividadeDTO } from "./atividade.types.js";
import Atividade from "./atividade.model.js";

class AtividadeService {
  public async create(data: ICreateAtividadeDTO) {
    const atividade = await Atividade.create({
      alunoId: new Types.ObjectId(data.alunoId),
      titulo: data.titulo,
      dataAtividade: data.dataAtividade,
      horas: data.horas,
      tecnologias: data.tecnologias,
      descricao: data.descricao,
    });

    return atividade;
  }

  public async findAll(): Promise<IAtividade[]> {
    return await Atividade.find();
  }

  public async findById(id: string) {
    return await Atividade.findById(id);
  }

  public async findAllByAluno(alunoId: string): Promise<IAtividade[]> {
    return await Atividade.find({ alunoId: new Types.ObjectId(alunoId) });
  }

  public async update(id: string, data: IUpdateAtividadeDTO) {
    return await Atividade.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  public async delete(id: string) {
    return await Atividade.findByIdAndDelete(id);
  }
}

export default new AtividadeService();
