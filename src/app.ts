import express from "express";
import type { Express } from "express";
import cors from "cors";
import routes from "./routes.js";
import database from "./config/database.js";
// Aqui no futuro importaremos: import { conectarMongo } from './config/databaseMongo.js'

class App {
  public server: Express;

  constructor() {
    this.server = express();
    this.middleware();
    this.routes();
    this.database();
  }

  private middleware(): void {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.server.use("/api/v1", routes);
  }

  private database(): void {
    console.log("Preparando conexão com os bancos de dados...");
    database.connect();
    // No futuro, colocaremos aqui:
    // conectarMongo();
    // conectarSqlServer();
  }
}

export default new App().server;
