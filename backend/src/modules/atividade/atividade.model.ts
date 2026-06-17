import mongoose, { Schema } from "mongoose";
import type { IAtividade } from "./atividade.types.js";

const atividadeSchema = new Schema<IAtividade>(
  {
    alunoId: {
      type: Number,
      ref: "Usuario",
      required: true,
    },
    relatorioId: {
      type: Schema.Types.ObjectId,
      ref: "Relatorio",
    },
    titulo: {
      type: String,
      required: true,
    },
    dataAtividade: {
      type: Date,
      required: true,
    },

    horas: {
      type: Number,
      required: true,
    },
    tecnologias: [
      {
        type: String,
        required: true,
      },
    ],
    descricao: {
      type: String,
      required: true,
    },
    comprovantes: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

const Atividade = mongoose.model<IAtividade>("Atividade", atividadeSchema);

export default Atividade;
