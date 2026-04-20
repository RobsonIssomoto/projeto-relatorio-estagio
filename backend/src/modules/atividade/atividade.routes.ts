import { Router } from "express";
import atividadeController from "./atividade.controller.js";

const atividadeRoutes = Router();

atividadeRoutes.post("/", atividadeController.create);
atividadeRoutes.get("/", atividadeController.findAll);
atividadeRoutes.get("/:id", atividadeController.findById);
atividadeRoutes.get("/aluno/:alunoId", atividadeController.findAllByAluno);
atividadeRoutes.put("/:id", atividadeController.update);
atividadeRoutes.delete("/:id", atividadeController.delete);

export default atividadeRoutes;
