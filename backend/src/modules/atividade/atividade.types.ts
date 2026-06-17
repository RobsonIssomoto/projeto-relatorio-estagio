import type { Types } from "mongoose";

export interface IAtividade {
  alunoId: number;
  relatorioId?: string;
  titulo: string;
  dataAtividade: Date;
  horas: number;
  tecnologias: string[];
  descricao: string;
  comprovantes: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateAtividadeDTO {
  alunoId: number;
  titulo: string;
  dataAtividade: Date;
  horas: number;
  tecnologias: string[];
  descricao: string;
  comprovantes?: string[];
}

export interface IUpdateAtividadeDTO {
  titulo?: string;
  dataAtividade?: Date;
  horas?: number;
  tecnologias?: string[];
  descricao?: string;
  comprovantes?: string[];
}
