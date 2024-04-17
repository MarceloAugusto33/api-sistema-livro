import { Router } from "express";
import UserController from "../controllers/UserController";

const userController = new UserController();
const userRoutes = Router();

userRoutes.get('/:id', userController.index);
userRoutes.post('/', userController.create);

export { userRoutes };