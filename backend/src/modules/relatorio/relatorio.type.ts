import type { Types } from "mongoose";

export interface IRelatorio {
  alunoId: Types.ObjectId;
  aluno: string;
  mesReferencia: string;
  atividades?: string[];
  horasRealizadas: number;
  status: "Pendente" | "Aprovado" | "Revisar";
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateRelatorioDTO {
  alunoId: string;
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
