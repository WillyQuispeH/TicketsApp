import { Router } from "express";

import * as PersonController from "../controllers/Person";

const PersonRouter = Router();

PersonRouter.get("/getByEmail/:email", PersonController.getByEmail);
PersonRouter.get("/getAll", PersonController.getAll);
PersonRouter.post("/create", PersonController.create);
PersonRouter.put("/update/:id", PersonController.update);
PersonRouter.delete("/deleteById/:id", PersonController.deleteById);

export default PersonRouter;
