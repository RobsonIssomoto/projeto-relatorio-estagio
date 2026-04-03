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

  public async findById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params ?? {};
    if (!id || typeof id !== "string") {
      return response.status(400).json({
        message: "Id inválido",
      });
    }

    const relatorio = await relatorioService.findById(id);
    return response.status(200).json(relatorio);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params ?? {};
    const { aluno, mesReferencia, atividades, horasRealizadas, status } =
      request.body ?? {};

    if (!id || typeof id !== "string") {
      return response.status(400).json({
        message: "Id inválido",
      });
    }
    const relatorio = await relatorioService.update(id, {
      //aluno não consegue alterar o nome, criar regra de negócio que alteração deverá ser solicitada para ADM
      mesReferencia,
      atividades,
      horasRealizadas,
      status,
    });

    return response.status(200).json(relatorio);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params ?? {};

    if (!id || typeof id !== "string") {
      return response.status(400).json({
        message: "Id inválido",
      });
    }
    await relatorioService.delete(id);
    return response.status(200).json({
      message: "Relatório deletado com sucesso",
    });
  }
}

export default new RelatorioController();
