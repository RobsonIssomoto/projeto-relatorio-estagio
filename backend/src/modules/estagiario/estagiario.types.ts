import { Types } from "mongoose";

export interface IEstagiario {
  _id: string;
  usuarioId: Types.ObjectId; // ID do login vinculado
  nome: string;
  cpf: string;
  telefone: string;
  vinculoAtual: {
    empresaId: string | null;
    supervisorId: string | null;
    status: "INATIVO" | "ATIVO" | "FINALIZADO";
  };
  createdAt: Date;
  updatedAt: Date;
}

export type ICreateEstagiarioDTO = {
  usuarioId: string;
  nome: string;
  cpf: string;
  telefone: string;
};
