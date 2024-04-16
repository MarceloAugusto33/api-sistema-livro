import { Router } from "express";
import { alunoRoutes } from "./alunos.routes";

const routes = Router();

routes.use('/alunos', alunoRoutes)

export { routes };