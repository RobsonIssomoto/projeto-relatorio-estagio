import mongoose, { Schema } from "mongoose";
import type { IRelatorio } from "./relatorio.types.js";

const relatorioSchema = new Schema<IRelatorio>(
  {
    alunoId: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    aluno: { type: String, required: true, trim: true },
    mesReferencia: { type: String, required: true, trim: true },
    atividades: [
      {
        type: Schema.Types.ObjectId,
        ref: "Atividade",
        required: true,
      },
    ],
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
