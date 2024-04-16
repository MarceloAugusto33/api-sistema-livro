import { Router } from "express";

import { alunoRoutes } from "./alunos.routes";
import { livroRoutes } from "./livros.routes";

const routes = Router();

routes.use('/alunos', alunoRoutes)
routes.use('/livros', livroRoutes)

export { routes };