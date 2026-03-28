import type { Request, Response } from "express";
import relatorioService from "./relatorio.service.js";

class RelatorioController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { aluno, mesReferencia, atividades, horasRealizadas, status } =
      request.body;

    const relatorio = await relatorioService.create({
      aluno,
      mesReferencia,
      atividades,
      horasRealizadas,
      status,
    });
    return response.status(201).json(relatorio);
  }
}

export default new RelatorioController();
