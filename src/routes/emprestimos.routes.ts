import { Router } from "express";
import EmprestimoController from "../controllers/EmprestimoController";

const emprestimoController = new EmprestimoController();
const emprestimoRoutes = Router();

emprestimoRoutes.get('/', emprestimoController.all);
emprestimoRoutes.post('/', emprestimoController.create);
emprestimoRoutes.put('/:id', emprestimoController.update);

export { emprestimoRoutes };