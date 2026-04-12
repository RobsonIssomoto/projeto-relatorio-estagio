import type { Request, Response, NextFunction } from "express";
import { ENV } from "../config/env.js";
import jwt from "jsonwebtoken";

export function garantirAutenticacao(request: Request, response: Response, next: NextFunction): void | Response {
  // 1. O React mandou o Token no cabeçalho?
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ erro: "Acesso negado. Token não fornecido." });
  }

  // 2. O formato padrão é "Bearer token_gigante_aqui"
  // Elimina o texto no espaço e pega só a segunda parte (o token)
  const partes = authHeader.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return response.status(401).json({ erro: "Erro de formatação do Token." });
  }

  const token = partes[1] as string;

  try {
    // 3. O token é válido, foi emitido e não expirou?
    const payload = jwt.verify(token, ENV.JWT_SECRET);

    // 4. Se for válido, injeta as informações de quem está logado na requisição!
    // Usando 'as any' temporariamente para o TypeScript não reclamar do campo novo.
    (request as any).usuarioLogado = payload;

    // 5. Pode passar! Vai para o Controller.
    return next();
  } catch (error) {
    return response.status(401).json({ erro: "Token inválido ou expirado. Faça login novamente." });
  }
}
