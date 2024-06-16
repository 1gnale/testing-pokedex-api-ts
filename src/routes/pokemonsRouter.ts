import { Router } from "express";
import getPokemonsController from "../controllers/getPokemonsController";
import getPokemonByNameController  from "../controllers/getPokemonByNameController";
import getPokemonByIdController from "../controllers/getPokemonByIdController";

const pokemonsRouter = Router();

pokemonsRouter.get("/", getPokemonByNameController , getPokemonsController)

pokemonsRouter.get("/:id", getPokemonByIdController)

export default pokemonsRouter;