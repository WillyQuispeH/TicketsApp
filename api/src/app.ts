import express from "express";
import cors from "cors";

import * as routes from "./routes";

import { reqLogger } from "./middlewares/logger";
import { auth } from "./middlewares/auth";

class App {
  public server: any;
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(express.urlencoded({ extended: false }));
  }
  routes() {
    this.server.use("/api/user", auth, reqLogger, routes.UserRouter);
    this.server.use("/api/customer", auth, reqLogger, routes.CustomerRouter);
  }
}
export default new App().server;
