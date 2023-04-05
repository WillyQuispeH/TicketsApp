import { Router } from "express";

import * as UserController from "../controllers/User";

const UserRouter = Router();

UserRouter.get("/getAll", UserController.getAll);
UserRouter.post("/create", UserController.create);
UserRouter.post("/validate", UserController.validate);
UserRouter.post("/recoverypassword", UserController.recoveryPassword);
UserRouter.put("/update/:id", UserController.update);
UserRouter.delete("/deleteById/:id", UserController.deleteById);

export default UserRouter;
