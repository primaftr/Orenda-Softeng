import "reflect-metadata";
import express from "express";
import cors from "cors";
import { dataSource } from "./config/ormconfig";
import { assignRoutes } from "./routes/assignRoutes";
import { commonRoutes } from "./routes/commonRoutes";
import { registerRoutes } from "./routes/registerRoutes";
import { unassignRoutes } from "./routes/unassignRoutes";

dataSource
  .initialize()
  .then(() => {
    const app = express();
    app.use(cors({ origin: "http://localhost:8000" }));

    app.use(function (req, res, next) {
      res.set("content-type", "application/json");
      next();
    });

    app.use(express.json());

    app.use(assignRoutes);
    app.use(commonRoutes);
    app.use(registerRoutes);
    app.use(unassignRoutes);

    console.log("Listening on port 3000");
    app.listen(3000);
  })
  .catch((err) => console.error(err));
