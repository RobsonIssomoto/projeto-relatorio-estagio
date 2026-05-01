import sql from "mssql";
import { ENV } from "./env.js";

class DatabaseSql {
  private dbConfig: sql.config = {
    user: ENV.DB_USER,
    password: ENV.DB_PASSWORD,
    database: ENV.DB_DATABASE,
    server: ENV.DB_SERVER,
    options: {
      encrypt: false, // Como é local, não precisa forçar criptografia de rede
      trustServerCertificate: true, // Fundamental para não dar erro de SSL no modo local
    },
  };

  public async connect(): Promise<sql.ConnectionPool> {
    try {
      const pool = await sql.connect(this.dbConfig);
      console.log("SQL Server conectado com sucesso");
      return pool;
    } catch (error) {
      console.error("Erro ao conectar no SQL Server", error);
      process.exit(1); //Se o banco falhar, derruba o app para manter o padrão do Mongo
    }
  }
}

export default new DatabaseSql();
