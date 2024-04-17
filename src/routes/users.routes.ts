import { Router } from "express";
import UserController from "../controllers/UserController";
import ensureAuthenticated from "../middlewares/ensureAuthenticated";

const userController = new UserController();
const userRoutes = Router();

userRoutes.get('/', ensureAuthenticated, userController.index);
userRoutes.post('/', userController.create);

export { userRoutes };