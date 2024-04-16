import { Router } from "express";
import LivroController from "../controllers/LivroController";

const livroRoutes = Router();
const livroController = new LivroController();

livroRoutes.get("/", livroController.all);
livroRoutes.get("/:id", livroController.index);
livroRoutes.post("/", livroController.create);
livroRoutes.put("/:id", livroController.update);
livroRoutes.delete("/:id", livroController.delete);

export { livroRoutes }

