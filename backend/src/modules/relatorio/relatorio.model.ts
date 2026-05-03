import mongoose, { Schema } from "mongoose";
import type { IRelatorio } from "./relatorio.types.js";

const relatorioSchema = new Schema<IRelatorio>(
  {
    alunoId: {
      type: Number, // 🚨 Aceita o ID numérico do SQL Server
      required: true,
      // Remove o ref: "Usuario" porque o usuário não está mais no Mongo
    },
    aluno: { type: String, required: true, trim: true },
    mesReferencia: { type: String, required: true, trim: true },
    atividades: [
      {
        type: Schema.Types.ObjectId,
        ref: "Atividade", // As atividades continuam com ref, pois estão no MongoDB!
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
