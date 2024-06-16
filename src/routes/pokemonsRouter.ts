import { Router } from "express";
import getPokemonsController from "../controllers/getPokemonsController";

const pokemonsRouter = Router();

pokemonsRouter.get("/", getPokemonsController)

export default pokemonsRouter;