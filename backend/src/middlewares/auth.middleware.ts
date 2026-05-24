import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";

export interface AuthRequest extends Request {
  usuarioLogado?: {
    id: number;
    perfil: number;
  };
}

export const authMiddleware = (request: AuthRequest, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ erro: "Acesso negado. Token não fornecido." });
  }

  const partes = authHeader.split(" ");
  if (partes.length !== 2 || partes[0] !== "Bearer") {
    return response.status(401).json({ erro: "Formato de token inválido." });
  }

  const token = partes[1];

  if (!token) {
    return response.status(401).json({ erro: "Token não encontrado na formatação." });
  }

  try {
    const secret = ENV.JWT_SECRET || "chave_seguranca_padrao_fatec";

    const decodificado = jwt.verify(token, secret) as unknown as { id: number; perfil: number };

    request.usuarioLogado = decodificado;

    next();
  } catch (error) {
    return response.status(401).json({ erro: "Token inválido ou expirado." });
  }
};
