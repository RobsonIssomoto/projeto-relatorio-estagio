import Relatorio from "./relatorio.model.js";
import Atividade from "../atividade/atividade.model.js";
import { prisma } from "../../config/databasePrisma.js";
import type { IRelatorio, IUpdateRelatorioDTO } from "./relatorio.types.js";

class RelatorioService {
  /**
   * Cria o relatório mensal buscando o Nome na tabela Estagiarios
   */
  public async create(alunoId: number, mesReferencia: string): Promise<IRelatorio> {
    // 1. Busca os dados do Estagiário vinculados ao UsuarioId
    const dadosEstagiario = await prisma.estagiarios.findFirst({
      where: { UsuarioId: alunoId }, // Vincula pelo ID do usuário logado
      select: { Nome: true }, // Pega o Nome
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
   * Exclui o relatório e libera as atividades vinculadas a ele
   */
  public async delete(id: string): Promise<IRelatorio | null> {
    // 1. Procura todas as atividades com ID de relatório e remove o campo "relatorioId"
    await Atividade.updateMany({ relatorioId: id }, { $unset: { relatorioId: "" } });

    // 2. Exclui o relatório do banco de dados
    return await Relatorio.findByIdAndDelete(id);
  }

  public async findBySupervisor(supervisorUsuarioId: number): Promise<IRelatorio[]> {
    // 1. (SQL Server) Descobre qual é o ID do Supervisor baseado no usuário logado
    const supervisor = await prisma.supervisores.findFirst({
      where: { UsuarioId: supervisorUsuarioId },
    });

    if (!supervisor) {
      throw new Error("Perfil de supervisor não encontrado.");
    }

    // 2. (SQL Server) Busca todos os Termos de Compromisso onde ele é o Supervisor
    // e extrai as informações do Estagiário amarrado a esse termo.
    const termos = await prisma.termosCompromisso.findMany({
      where: { SupervisorId: supervisor.Id },
      include: {
        SolicitacoesEstagio: {
          include: {
            Estagiarios: true, // Estagiário
          },
        },
      },
    });

    // 3. Extrai apenas os 'UsuarioId' dos estagiários encontrados
    const alunosIds = termos
      .map((termo) => termo.SolicitacoesEstagio?.Estagiarios?.UsuarioId)
      .filter((id) => id !== undefined && id !== null);

    if (alunosIds.length === 0) {
      return []; // Se ele não tem alunos, retorna vazio
    }

    // 4. (MongoDB) Busca os relatórios apenas dos alunos encontrados
    return await Relatorio.find({
      alunoId: { $in: alunosIds },
      // Se quiser mostrar os já aprovados no histórico, remover a linha abaixo:
      status: "Pendente",
    }).sort({ createdAt: -1 });
  }

  /**
   * 💡 Aprova ou Devolve o relatório
   */
  public async avaliarRelatorio(
    id: string,
    status: "Aprovado" | "Devolvido",
    observacao?: string,
  ): Promise<IRelatorio | null> {
    return await Relatorio.findByIdAndUpdate(
      id,
      {
        $set: { status, observacao: observacao || "" },
      },
      { new: true }, // Retorna o documento já atualizado
    );
  }
}

export default new RelatorioService();
