import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const SEGREDO_JWT = (process.env.JWT_SECRET as string) || "minha_chave_super_secreta_fatec_2024";

export function garantirAutenticacao(request: Request, response: Response, next: NextFunction): void | Response {
  // 1. O React mandou o Token no cabeçalho?
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ erro: "Acesso negado. Token não fornecido." });
  }

  // 2. O formato padrão é "Bearer token_gigante_aqui"
  // Nós cortamos o texto no espaço e pegamos só a segunda parte (o token)
  const partes = authHeader.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return response.status(401).json({ erro: "Erro de formatação do Token." });
  }

  const token = partes[1] as string;

  try {
    // 3. O token é válido, foi nós que emitimos e não expirou?
    const payload = jwt.verify(token, SEGREDO_JWT);

    // 4. Se for válido, injetamos as informações de quem está logado na requisição!
    // Usamos 'as any' temporariamente para o TypeScript não reclamar do campo novo.
    (request as any).usuarioLogado = payload;

    // 5. Pode passar! Vai para o Controller.
    return next();
  } catch (error) {
    return response.status(401).json({ erro: "Token inválido ou expirado. Faça login novamente." });
  }
}
