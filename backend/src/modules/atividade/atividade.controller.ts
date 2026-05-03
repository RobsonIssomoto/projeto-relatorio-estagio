import type { Request, Response } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";
import atividadeService from "./atividade.service.js";

class AtividadeController {
  public async create(request: AuthRequest, response: Response): Promise<Response> {
    try {
      const { titulo, dataAtividade, horas, tecnologias, descricao } = request.body;
      const alunoId = request.usuarioLogado?.id;
      if (!alunoId) {
        return response.status(401).json({ erro: "Sessão inválida." });
      }
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

  // public async findAllByAluno(request: AuthRequest, response: Response): Promise<Response> {
  //   try {
  //     // 1. Tenta pegar o ID da URL (Params)
  //     const idDaUrl = request.params.alunoId;

  //     // 2. Pega o ID do Token (Segurança)
  //     const idDoToken = request.usuarioLogado?.id;

  //     // 3. Lógica de decisão: Prioriza o ID da URL se ele existir (para uso de ADM/Professor)
  //     // Caso contrário, usa o ID do Token (para o aluno logado)
  //     const alunoIdFinal = idDaUrl ? Number(idDaUrl) : idDoToken;

  //     // Validação de segurança
  //     if (!alunoIdFinal) {
  //       return response.status(401).json({ erro: "ID do aluno não identificado." });
  //     }

  //     // 4. Busca no Service usando o ID numérico (Ponte SQL-Mongo)
  //     const atividades = await atividadeService.findAllByAluno(alunoIdFinal);

  //     return response.status(200).json(atividades);
  //   } catch (error) {
  //     if (error instanceof Error) {
  //       return response.status(400).json({ erro: error.message });
  //     }
  //     return response.status(500).json({ erro: "Erro interno ao buscar atividades." });
  //   }
  // }

  public async findAllByAluno(request: AuthRequest, response: Response): Promise<Response> {
    try {
      const alunoId = request.usuarioLogado?.id;

      if (!alunoId) {
        return response.status(401).json({ erro: "Usuário não identificado" });
      }

      const atividades = await atividadeService.findAllByAluno(Number(alunoId));
      return response.status(200).json(atividades);
    } catch (error) {
      console.error(" ERRO NO CONTROLLER:", error);

      if (error instanceof Error) {
        return response.status(400).json({ erro: error.message });
      }
      return response.status(500).json({ erro: "Erro interno ao buscar atividades." });
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
