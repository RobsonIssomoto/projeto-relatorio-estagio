import { Schema, model } from "mongoose";
import type { IEmpresa } from "./empresa.types.js";

const EmpresaSchema = new Schema<IEmpresa>(
  {
    usuarioId: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
    razaoSocial: { type: String, required: true },
    cnpj: { type: String, required: true },
    responsavel: { type: String, required: true },
    telefone: { type: String, required: true },
  },
  { timestamps: true, versionKey: false },
);

// Força o nome "empresas" no final para o MongoDB criar a collection
export default model<IEmpresa>("Empresa", EmpresaSchema, "empresas");
