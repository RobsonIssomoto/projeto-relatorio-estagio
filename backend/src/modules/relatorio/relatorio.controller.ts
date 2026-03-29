import type { Request, Response } from "express";
import relatorioService from "./relatorio.service.js";

class RelatorioController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      alunoId,
      aluno,
      mesReferencia,
      atividades,
      horasRealizadas,
      status,
    } = request.body;

    const relatorio = await relatorioService.create({
      alunoId,
      aluno,
      mesReferencia,
      atividades,
      horasRealizadas,
      status,
    });
    return response.status(201).json(relatorio);
  }

  public async findAll(
    request: Request,
    response: Response,
  ): Promise<Response> {
    try {
      const relatorios = await relatorioService.findAll();
      return response.status(200).json(relatorios);
    } catch (error: any) {
      return response.status(500).json({ erro: "Erro ao listar relatórios" });
    }
  }
}

export default new RelatorioController();
