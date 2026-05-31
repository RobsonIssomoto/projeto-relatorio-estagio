/// <reference types="node" />
import { PrismaClient } from "@prisma/client";
import { ENV } from "./src/config/env";

// 1. INJEÇÃO FORÇADA: O Prisma olha para process.env.DATABASE_URL automaticamente
process.env.DATABASE_URL = ENV.DATABASE_URL;

// 2. INICIALIZAÇÃO LIMPA: Sem configurações de datasources aqui,
// o TypeScript não reclamará de propriedades desconhecidas.
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Iniciando Seed (Modo Blindado)...");

  try {
    // Exemplo de teste simples:
    const count = await prisma.empresas.count();
    console.log(`✅ Conectado! Total de empresas encontradas: ${count}`);

    // ...coloque aqui a criação dos seus dados...

    console.log("✅ Seed concluído!");
  } catch (error) {
    console.error("❌ Erro no Seed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
