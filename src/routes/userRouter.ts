import { Router } from "express";
import { create } from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import * as schemas from "../schemas/index.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(schemas.user), create);

export default userRouter;
