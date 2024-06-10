import { Router } from "express";
import typesController from "../controllers/typesController";

const typesRouter = Router();

typesRouter.get("/", typesController)

export default typesRouter;