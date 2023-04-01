import { Router } from "express";
import * as CustomerController from "../controllers/Customer";

const CustomerRouter = Router();

CustomerRouter.get("/getAll", CustomerController.getAll);
CustomerRouter.put("/create/:type", CustomerController.create);
CustomerRouter.get("/getById/:id", CustomerController.getById);
CustomerRouter.put("/update/:id", CustomerController.update);
CustomerRouter.delete("/deleteById/:id", CustomerController.deleteById);

export default CustomerRouter;
