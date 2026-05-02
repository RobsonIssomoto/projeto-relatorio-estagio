import { PrismaClient } from "@prisma/client";
import { PrismaMssql } from "@prisma/adapter-mssql";

import { ENV } from "../config/env.js";

const adapter = new PrismaMssql(ENV.DATABASE_URL);

export const prisma = new PrismaClient({ adapter });

export async function testarPrisma() {
  try {
    await prisma.$connect();
    console.log("Prisma conectado ao SQL Server via Adaptador!");
  } catch (error) {
    console.error("Erro na conexão do Prisma:", error);
  }
}
