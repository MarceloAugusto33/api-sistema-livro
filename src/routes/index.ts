import { Router } from "express";

import { userRoutes } from "./users.routes";
import { alunoRoutes } from "./alunos.routes";
import { livroRoutes } from "./livros.routes";
import { emprestimoRoutes } from "./emprestimos.routes";
import { sessionRoutes } from "./sessions.routes";

const routes = Router();

routes.use('/alunos', alunoRoutes);
routes.use('/livros', livroRoutes);
routes.use('/emprestimos', emprestimoRoutes);
routes.use('/users', userRoutes);
routes.use('/sessions', sessionRoutes)

export { routes };