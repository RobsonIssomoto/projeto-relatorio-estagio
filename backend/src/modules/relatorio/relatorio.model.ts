import mongoose, { Schema } from "mongoose";
import type { IRelatorio } from "./relatorio.types.js";

const relatorioSchema = new Schema<IRelatorio>(
  {
    alunoId: {
      type: Number, // ID do Usuário (SQL Server)
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
      // Alinhado com o Front-end:
      enum: ["Pendente", "Aprovado", "Devolvido"],
      default: "Pendente",
    },
    // campo para guardar o motivo da devolução do Supervisor
    observacao: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

const Relatorio = mongoose.model<IRelatorio>("Relatorio", relatorioSchema);

export default Relatorio;
