export interface IRelatorio {
  alunoId: number;
  aluno: string;
  mesReferencia: string;
  atividades?: string[]; // O ID das atividades continua sendo string (ObjectId) pois estão no Mongo
  horasRealizadas: number;
  status: "Pendente" | "Aprovado" | "Revisar";
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateRelatorioDTO {
  alunoId: number;
  aluno: string;
  mesReferencia: string;
  atividades?: string[];
  horasRealizadas: number;
  status: "Pendente" | "Aprovado" | "Revisar";
}

export interface IUpdateRelatorioDTO {
  mesReferencia?: string;
  atividades?: string[];
  horasRealizadas?: number;
  status?: "Pendente" | "Aprovado" | "Revisar";
}
