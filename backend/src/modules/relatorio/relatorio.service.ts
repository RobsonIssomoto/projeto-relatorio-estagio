/*

Papel da service
 
Reponsável por:
    -Criar 
    -Listar 
    -Buscar por id
    -Atualizar 
    -Excluir 

    Concentra as operações e regras de negócio relacionado ao módulo 
    ------------------------------------------------------------------
    O Service
        -Não recebe req e res
        -Não define rota
        -Não conhece protocolo HTTP
        -Responsável pela lógica

*/

import Relatorio from "./relatorio.model.js";
import type {
  ICreateRelatorioDTO,
  IUpdateRelatorioDTO,
} from "./relatorio.type.js";

class RelatorioService {
  public async create(data: ICreateRelatorioDTO) {
    const relatorio = await Relatorio.create({
      aluno: data.aluno,
      mesReferencia: data.mesReferencia,
      atividades: data.atividades,
      horasRealizadas: data.horasRealizadas,
      status: data.status,
    });

    return relatorio;
  }
}

export default new RelatorioService();
