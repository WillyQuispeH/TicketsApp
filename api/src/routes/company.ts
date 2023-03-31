import { Router } from "express";

import * as CompanyController from "../controllers/Company";

const CompanyRouter = Router();

CompanyRouter.get("/getAll", CompanyController.getAll);
CompanyRouter.post("/create", CompanyController.create);
CompanyRouter.put("/update/:id" ,CompanyController.update);
CompanyRouter.delete("/deleteById/:id", CompanyController.deleteById);

export default CompanyRouter;
