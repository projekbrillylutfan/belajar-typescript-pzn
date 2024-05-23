import express from "express";
import { publicRouter } from "../route/public-api.js";
import { errorMiddleware } from "../middleware/error-middleware.js";
import { apiRouter } from "../route/api.js";
export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(apiRouter);
web.use(errorMiddleware);
