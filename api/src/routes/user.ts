import { Router} from "express";

import  * as UserController from "../controllers/User";

const UserRouter = Router();

UserRouter.get("/getAll", UserController.getAll);
UserRouter.post("/create", UserController.create);
UserRouter.post("/validate", UserController.validate)
UserRouter.post("/recoverypassword", UserController.recoveryPassword)

export default UserRouter;