import { Schema, model } from "mongoose";
import type { IEstagiario } from "./estagiario.types.js";

const EstagiarioSchema = new Schema<IEstagiario>(
  {
    usuarioId: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    telefone: { type: String, required: true },
    vinculoAtual: {
      empresaId: { type: Schema.Types.ObjectId, ref: "Empresa", default: null },
      supervisorId: { type: Schema.Types.ObjectId, ref: "Usuario", default: null },
      status: { type: String, enum: ["INATIVO", "ATIVO", "FINALIZADO"], default: "INATIVO" },
    },
  },
  { timestamps: true, versionKey: false },
);

export default model<IEstagiario>("Estagiario", EstagiarioSchema);
