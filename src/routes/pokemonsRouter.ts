import { Router } from "express";
import getPokemonsController from "../controllers/getPokemonsController";
import getPokemonByNameController  from "../controllers/getPokemonByNameController";

const pokemonsRouter = Router();

pokemonsRouter.get("/", getPokemonByNameController , getPokemonsController)

export default pokemonsRouter;