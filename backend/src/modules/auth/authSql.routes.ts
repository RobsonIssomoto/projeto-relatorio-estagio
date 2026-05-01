import { Router } from "express";
import { AuthServiceSql } from "./authSql.service.js"; // Importe o service

const authSqlRoutes = Router();

// Rota de Teste do SQL
authSqlRoutes.post("/teste-cadastro", async (req, res) => {
  try {
    const { login, email, senha, perfil } = req.body;

    // Chama a função do Service
    const resultado = await AuthServiceSql.cadastrar(login, email, senha, perfil);

    return res.status(201).json(resultado);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default authSqlRoutes;
