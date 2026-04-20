import type { Types } from "mongoose";

export interface IAtividade {
  alunoId: Types.ObjectId;
  relatorioId?: Types.ObjectId;
  titulo: string;
  dataAtividade: Date;
  horas: number;
  tecnologias: string[];
  descricao: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAtividadeDTO {
  alunoId: string;
  titulo: string;
  dataAtividade: Date;
  horas: number;
  tecnologias: string[];
  descricao: string;
}

export interface IUpdateAtividadeDTO {
  titulo?: string;
  dataAtividade?: Date;
  horas?: number;
  tecnologias?: string;
  descricao?: string;
}
