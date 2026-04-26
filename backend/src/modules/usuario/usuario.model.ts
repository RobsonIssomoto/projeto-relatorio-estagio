import { Schema, model } from "mongoose";
import type { IUsuario } from "./usuario.types.js";

const UsuarioSchema = new Schema<IUsuario>(
  {
    email: { type: String, required: true, unique: true },
    senhaHash: { type: String, required: true },
    perfil: { type: Number, required: true }, // Armazena o enum como número
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    versionKey: false, // Remove o campo __v que o Mongoose cria por padrão
  },
);

// O Mongoose já fornece métodos como .create(), .findOne(), .find()
// Então não precisa criar a classe UsuarioModel com métodos manuais como antes.
const UsuarioModel = model<IUsuario>("Usuario", UsuarioSchema);

export default UsuarioModel;
