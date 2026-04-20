import type { Request, Response } from "express";
import atividadeService from "./atividade.service.js";

class AtividadeController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { alunoId, titulo, dataAtividade, horas, tecnologias, descricao } = request.body;

      const atividade = await atividadeService.create({
        alunoId,
        titulo,
        dataAtividade,
        horas,
        tecnologias,
        descricao,
      });
      return response.status(201).json(atividade);
    } catch (error) {
      // Verifica se o erro é  uma instância da classe Error nativa do Node
      if (error instanceof Error) {
        return response.status(400).json({ erro: error.message });
      }
      return response.status(500).json({ erro: "Erro interno desconhecido ao salvar atividade." });
    }
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const atividades = await atividadeService.findAll();
      return response.status(200).json(atividades);
    } catch (error) {
      // Verifica se o erro é  uma instância da classe Error nativa do Node
      if (error instanceof Error) {
        return response.status(400).json({ erro: error.message });
      }
      return response.status(500).json({ erro: "Erro interno desconhecido ao listar atividades." });
    }
  }
  public async findById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params ?? {};
    if (!id || typeof id !== "string") {
      return response.status(400).json({ message: "Id inválido" });
    }

    const atividade = await atividadeService.findById(id);
    return response.status(200).json(atividade);
  }

  public async findAllByAluno(request: Request, response: Response): Promise<Response> {
    try {
      const { alunoId } = request.params;

      if (!alunoId || typeof alunoId !== "string") {
        return response.status(400).json({ message: "ID do aluno inválido" });
      }

      const atividades = await atividadeService.findAllByAluno(alunoId);
      return response.status(200).json(atividades);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ erro: error.message });
      }
      return response.status(500).json({ erro: "Erro interno ao buscar atividades do aluno." });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params ?? {};
    const { titulo, dataAtividade, horas, tecnologias, descricao } = request.body ?? {};

    if (!id || typeof id !== "string") {
      return response.status(400).json({ message: "Id inválido" });
    }
    const atividade = await atividadeService.update(id, {
      titulo,
      dataAtividade,
      horas,
      tecnologias,
      descricao,
    });

    return response.status(200).json(atividade);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params ?? {};
    if (!id || typeof id !== "string") {
      return response.status(400).json({ message: "Id inválido" });
    }
    await atividadeService.delete(id);
    return response.status(200).json({ message: "Atividade deletada com sucesso" });
  }
}

export default new AtividadeController();
