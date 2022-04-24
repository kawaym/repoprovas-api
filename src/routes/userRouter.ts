import { Router } from "express";
import {
  create,
  login,
  validateSession,
} from "../controllers/userController.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import * as schemas from "../schemas/index.js";

const userRouter = Router();

userRouter.post("/signup", validateSchema(schemas.user), create);
userRouter.post("/", validateSchema(schemas.user), login);
userRouter.get("/", validateSession);

export default userRouter;
