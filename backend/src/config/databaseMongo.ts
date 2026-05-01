import mongoose from "mongoose";
import { ENV } from "./env.js";

class DatabaseMongo {
  public async connect(): Promise<void> {
    try {
      await mongoose.connect(ENV.MONGO_URI);
      console.log("MongoDB conectado com sucesso!");
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB", error);
      process.exit(1);
    }
  }
}

export default new DatabaseMongo();
