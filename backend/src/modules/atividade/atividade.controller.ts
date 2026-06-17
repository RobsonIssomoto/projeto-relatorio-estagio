import type { Request, Response } from "express";
import type { AuthRequest } from "../../middlewares/auth.middleware.js";
import atividadeService from "./atividade.service.js";

import path from "path";
import fs from "fs";

class AtividadeController {
  public async create(request: AuthRequest, response: Response): Promise<Response> {
    try {
      const { titulo, dataAtividade, horas, tecnologias, descricao } = request.body;
      const alunoId = request.usuarioLogado?.id;

      if (!alunoId) {
        return response.status(401).json({ erro: "Sessão inválida." });
      }

      // Captura os arquivos salvos pelo Multer e pega apenas os caminhos
      const arquivosSalvos = request.files as Express.Multer.File[];
      const caminhosComprovantes = arquivosSalvos?.map((file) => file.filename) || [];

      // Como o FormData manda tudo como string, garante que tecnologias seja um array
      const tecnologiasArray = Array.isArray(tecnologias) ? tecnologias : [tecnologias];

      const atividade = await atividadeService.create({
        alunoId,
        titulo,
        dataAtividade,
        horas: Number(horas), // Converte de string para number
        tecnologias: tecnologiasArray,
        descricao,
        comprovantes: caminhosComprovantes, // Passa os caminhos para o Service/Banco
      });

      return response.status(201).json(atividade);
    } catch (error) {
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
    try {
      const { id } = request.params ?? {};
      const { titulo, dataAtividade, horas, tecnologias, descricao } = request.body ?? {};

      if (!id || typeof id !== "string") {
        return response.status(400).json({ message: "Id inválido" });
      }

      // 1. Busca a atividade atual no banco para não perder os arquivos antigos
      const atividadeAtual = await atividadeService.findById(id);
      if (!atividadeAtual) {
        return response.status(404).json({ message: "Atividade não encontrada" });
      }

      // 2. Captura os NOVOS arquivos salvos pelo Multer nesta edição
      const arquivosSalvos = request.files as Express.Multer.File[];
      const novosCaminhos = arquivosSalvos?.map((file) => file.filename) || [];

      // 3. Junta os comprovantes antigos com os novos
      const todosComprovantes = [...(atividadeAtual.comprovantes || []), ...novosCaminhos];

      // 4. Monta o objeto de atualização dinamicamente para evitar erro de "undefined" no TypeScript
      const dadosAtualizacao: any = {
        comprovantes: todosComprovantes,
      };

      // Só anexa os campos se eles realmente existirem no request.body
      if (titulo) dadosAtualizacao.titulo = titulo;
      if (dataAtividade) dadosAtualizacao.dataAtividade = dataAtividade;
      if (horas) dadosAtualizacao.horas = Number(horas);
      if (descricao) dadosAtualizacao.descricao = descricao;

      if (tecnologias) {
        dadosAtualizacao.tecnologias = Array.isArray(tecnologias) ? tecnologias : [tecnologias];
      }

      // 5. Envia para o Service
      const atividade = await atividadeService.update(id, dadosAtualizacao);

      return response.status(200).json(atividade);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ erro: "Erro interno ao atualizar atividade." });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params ?? {};
    if (!id || typeof id !== "string") {
      return response.status(400).json({ message: "Id inválido" });
    }
    await atividadeService.delete(id);
    return response.status(200).json({ message: "Atividade deletada com sucesso" });
  }

  public async baixarComprovante(request: AuthRequest, response: Response): Promise<any> {
    try {
      const { id, nomeArquivo } = request.params;
      const alunoLogadoId = request.usuarioLogado?.id;

      if (!alunoLogadoId) {
        return response.status(401).json({ erro: "Sessão inválida." });
      }

      if (!id || typeof id !== "string") {
        return response.status(400).json({ erro: "ID da atividade inválido." });
      }

      if (!nomeArquivo || typeof nomeArquivo !== "string") {
        return response.status(400).json({ erro: "Nome do arquivo inválido." });
      }

      // 1. Busca a atividade no banco para checar o dono
      const atividade = await atividadeService.findById(id);

      if (!atividade) {
        return response.status(404).json({ erro: "Atividade não encontrada." });
      }

      // 2. A BARREIRA DE SEGURANÇA: Só o dono acessa!
      if (atividade.alunoId !== alunoLogadoId) {
        return response.status(403).json({ erro: "Acesso negado. Você só pode ver seus próprios arquivos." });
      }

      // 3. Monta o caminho exato do arquivo no servidor
      const caminhoArquivo = path.resolve("uploads", "comprovantes", nomeArquivo);

      // 4. Verifica se o arquivo ainda existe na pasta
      if (!fs.existsSync(caminhoArquivo)) {
        return response.status(404).json({ erro: "Arquivo não encontrado no servidor." });
      }

      // 5. Devolve o arquivo como download/visualização
      return response.sendFile(caminhoArquivo);
    } catch (error) {
      console.error(error);
      return response.status(500).json({ erro: "Erro ao baixar arquivo." });
    }
  }

  public async excluirComprovante(request: AuthRequest, response: Response): Promise<any> {
    try {
      const { id, nomeArquivo } = request.params;
      const alunoLogadoId = request.usuarioLogado?.id;

      if (!alunoLogadoId) {
        return response.status(401).json({ erro: "Sessão inválida." });
      }

      if (!id || typeof id !== "string") {
        return response.status(400).json({ erro: "ID da atividade inválido." });
      }

      if (!nomeArquivo || typeof nomeArquivo !== "string") {
        return response.status(400).json({ erro: "Nome do arquivo inválido." });
      }

      // 1. Busca a atividade no banco
      const atividade = await atividadeService.findById(id);

      if (!atividade) {
        return response.status(404).json({ erro: "Atividade não encontrada." });
      }

      // 2. Segurança: Só o dono pode apagar
      if (atividade.alunoId !== alunoLogadoId) {
        return response.status(403).json({ erro: "Acesso negado. Você não pode excluir arquivos de outra pessoa." });
      }

      // 3. Remove o nome do arquivo da lista (Array) e atualiza o MongoDB
      const novaListaDeComprovantes = atividade.comprovantes.filter((nome) => nome !== nomeArquivo);
      await atividadeService.update(id, { comprovantes: novaListaDeComprovantes });

      // 4. Apaga o arquivo físico da pasta do servidor
      const caminhoArquivo = path.resolve("uploads", "comprovantes", nomeArquivo);
      if (fs.existsSync(caminhoArquivo)) {
        fs.unlinkSync(caminhoArquivo); // unlinkSync é o comando do Node para deletar arquivos
      }

      return response.status(200).json({ mensagem: "Arquivo excluído com sucesso." });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ erro: "Erro ao excluir arquivo." });
    }
  }
}

export default new AtividadeController();
