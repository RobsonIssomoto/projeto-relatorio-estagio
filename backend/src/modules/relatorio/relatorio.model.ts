import mongoose, { Schema } from "mongoose";
import type { IRelatorio } from "./relatorio.type.js";

const relatorioSchema = new Schema<IRelatorio>(
  {
    alunoId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario", // O nome do seu model de Usuário
      required: true,
    },
    aluno: { type: String, required: true, trim: true },
    mesReferencia: { type: String, required: true, trim: true },
    atividades: [{ type: String, required: true }],
    horasRealizadas: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pendente", "Aprovado", "Revisar"],
      default: "Pendente",
    },
  },
  {
    timestamps: true,
  },
);

const Relatorio = mongoose.model<IRelatorio>("Relatorio", relatorioSchema);

export default Relatorio;
