import Relatorio from "./relatorio.model.js";
import Atividade from "../atividade/atividade.model.js";
import { prisma } from "../../config/databasePrisma.js";
import type { IRelatorio, IUpdateRelatorioDTO } from "./relatorio.types.js";

class RelatorioService {
  /**
   * Cria o relatório mensal buscando o Nome na tabela Estagiarios
   */
  public async create(alunoId: number, mesReferencia: string): Promise<IRelatorio> {
    // 1. Busca os dados do Estagiário vinculados ao UsuarioId (131)
    const dadosEstagiario = await prisma.estagiarios.findFirst({
      where: { UsuarioId: alunoId }, // Vincula pelo ID do usuário logado
      select: { Nome: true }, // Pega o Nome que existe aqui
    });

    // 2. Busca atividades que ainda não possuem relatório para este aluno
    const atividadesPendentes = await Atividade.find({
      alunoId: alunoId,
      relatorioId: { $exists: false },
    });

    console.log("Atividades encontradas:", atividadesPendentes.length);
    // 3. Soma as horas das atividades
    const totalHoras = atividadesPendentes.reduce((acc, curr) => acc + curr.horas, 0);

    // 4. Cria o relatório no MongoDB
    const relatorio = await Relatorio.create({
      alunoId: alunoId,
      aluno: dadosEstagiario?.Nome || "Estagiário", // Usa o Nome da tabela Estagiarios
      mesReferencia,
      atividades: atividadesPendentes.map((a) => a._id.toString()),
      horasRealizadas: totalHoras,
      status: "Pendente",
    });

    // 5. Vincula as atividades ao novo relatório
    await Atividade.updateMany(
      { _id: { $in: atividadesPendentes.map((a) => a._id) } },
      { $set: { relatorioId: relatorio._id } },
    );

    return relatorio;
  }

  /**
   * Lista todos os relatórios (Geral)
   */
  public async findAll(filtro: { alunoId?: number } = {}): Promise<IRelatorio[]> {
    return await Relatorio.find(filtro).sort({ createdAt: -1 });
  }

  /**
   * Busca um relatório específico por ID do MongoDB
   */
  public async findById(id: string): Promise<IRelatorio | null> {
    return await Relatorio.findById(id);
  }

  /**
   * Busca relatórios de um aluno específico pelo ID numérico
   */
  public async findByUser(alunoId: number): Promise<IRelatorio[]> {
    return await Relatorio.find({ alunoId }).sort({ createdAt: -1 });
  }

  /**
   * Atualiza o status ou observações do relatório
   */
  public async update(id: string, data: IUpdateRelatorioDTO): Promise<IRelatorio | null> {
    return await Relatorio.findByIdAndUpdate(id, data, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  /**
   * Exclui o relatório
   */
  public async delete(id: string): Promise<IRelatorio | null> {
    return await Relatorio.findByIdAndDelete(id);
  }
}

export default new RelatorioService();
