import { Router } from "express";
import AlunoController from "../controllers/AlunoController";

const alunoRoutes = Router();

const alunoController = new AlunoController();

alunoRoutes.get("/", alunoController.all);
alunoRoutes.get('/:id', alunoController.index);
alunoRoutes.post('/', alunoController.create);
alunoRoutes.put('/:id', alunoController.update);
alunoRoutes.delete('/:id', alunoController.delete);

export { alunoRoutes };
