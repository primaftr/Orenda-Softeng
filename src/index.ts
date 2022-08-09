import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { dataSource } from "./config/ormconfig";
import { assignRoutes } from "./routes/assignRoutes";
import { commonRoutes } from "./routes/commonRoutes";
import { registerRoutes } from "./routes/registerRoutes";
import { unassignRoutes } from "./routes/unassignRoutes";

const port = process.env.PORT;
const corsOrigin = process.env.CORS_ORIGIN || undefined;

dataSource
  .initialize()
  .then(() => {
    const app = express();
    app.use(cors({ origin: corsOrigin }));

    app.use(function (req, res, next) {
      res.set("content-type", "application/json");
      next();
    });

    app.use(express.json());

    app.use(assignRoutes);
    app.use(commonRoutes);
    app.use(registerRoutes);
    app.use(unassignRoutes);

    console.log(`Listening on port ${port}`);
    app.listen(port);
  })
  .catch((err) => console.error(err));
