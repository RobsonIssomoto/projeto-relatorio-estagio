import type { Request, Response } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";
import relatorioService from "./relatorio.service.js";

class RelatorioController {
  public async create(request: AuthRequest, response: Response): Promise<Response> {
    try {
      // 1. Pega o mês que veio do ModalGerarRelatorio
      const { mesReferencia } = request.body;

      // 2. Pega o ID  que veio do seu Token JWT
      const alunoId = request.usuarioLogado?.id;

      if (!alunoId) {
        return response.status(401).json({ erro: "Usuário não autenticado." });
      }

      if (!mesReferencia) {
        return response.status(400).json({ erro: "O mês de referência é obrigatório." });
      }

      // 3. Chama o Service passando os dois parâmetros (ID e Mês)
      // A lógica de somar horas e buscar o Nome agora acontece lá dentro!
      const relatorio = await relatorioService.create(Number(alunoId), mesReferencia);

      return response.status(201).json(relatorio);
    } catch (error: any) {
      console.error("Erro ao criar relatório:", error);

      // Retorna a mensagem real do erro para ajudar no debug
      return response.status(400).json({
        erro: "Falha ao gerar relatório.",
        detalhes: error.message,
      });
    }
  }

  public async findAll(request: Request, response: Response): Promise<Response> {
    try {
      const alunoId = request.params.alunoId;
      // Cria o filtro garantindo o tipo correto
      const filtro = alunoId ? { alunoId: Number(alunoId) } : {};
      const relatorios = await relatorioService.findAll(filtro);
      return response.status(200).json(relatorios);
    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ erro: error.message });
      }
      return response.status(500).json({ erro: "Erro interno  ao listar relatórios." });
    }
  }

  public async findById(request: Request, response: Response): Promise<Response> {
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
    const { aluno, mesReferencia, atividades, horasRealizadas, status } = request.body ?? {};

    if (!id || typeof id !== "string") {
      return response.status(400).json({
        message: "Id inválido",
      });
    }
    const relatorio = await relatorioService.update(id, {
      mesReferencia,
      atividades,
      horasRealizadas,
      status,
    });

    return response.status(200).json(relatorio);
  }

  public async findByUser(request: AuthRequest, response: Response) {
    try {
      const usuarioId = request.usuarioLogado?.id;

      if (!usuarioId) {
        return response.status(401).json({ erro: "Usuário não identificado." });
      }

      const relatorios = await relatorioService.findByUser(usuarioId);

      return response.status(200).json(relatorios);
    } catch (erro) {
      console.error(erro);
      return response.status(500).json({ erro: "Erro ao buscar relatórios" });
    }
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
