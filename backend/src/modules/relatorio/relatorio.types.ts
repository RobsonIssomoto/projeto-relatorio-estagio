export interface IRelatorio {
  _id?: string; // 💡 Adicionado para facilitar o mapeamento do MongoDB
  alunoId: number;
  aluno: string;
  mesReferencia: string;
  atividades?: string[];
  horasRealizadas: number;
  status: "Pendente" | "Aprovado" | "Devolvido";
  observacao?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateRelatorioDTO {
  alunoId: number;
  aluno: string;
  mesReferencia: string;
  atividades?: string[];
  horasRealizadas: number;
  status: "Pendente" | "Aprovado" | "Devolvido";
}

export interface IUpdateRelatorioDTO {
  mesReferencia?: string;
  atividades?: string[];
  horasRealizadas?: number;
  status?: "Pendente" | "Aprovado" | "Devolvido";
  observacao?: string;
}
