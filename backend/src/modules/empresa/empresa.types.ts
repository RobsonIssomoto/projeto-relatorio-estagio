import { Types } from "mongoose";

export interface IEmpresa {
  _id: string;
  usuarioId: Types.ObjectId; // Referência ao Login
  razaoSocial: string;
  cnpj: string;
  responsavel: string;
  telefone: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateEmpresaDTO = {
  usuarioId: string;
  razaoSocial: string;
  cnpj: string;
  responsavel: string;
  telefone: string;
};
