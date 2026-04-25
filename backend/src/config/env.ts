import "dotenv/config";

//Função inteligente que valida e já retorna estritamente uma string
function obterVariavelAmbiente(nomeDaVariavel: string): string {
  const valor = process.env[nomeDaVariavel];
  if (!valor) {
    throw new Error(`ERRO CRÍTICO: A variável de ambiente ${nomeDaVariavel} não foi configurada no .env!`);
  }
  return valor;
}

// Exporta um objeto limpo com todas as variáveis que o sistema vai usar
export const ENV = {
  //Função. O TypeScript agora tem 100% de certeza que SEGREDO_JWT é uma string.
  JWT_SECRET: obterVariavelAmbiente("JWT_SECRET"),
  MONGO_URI: obterVariavelAmbiente("MONGO_URI"),
  PORT: obterVariavelAmbiente("PORT") || "3000",
};
