import { Request, Response } from "express";
import { getAllPokemons } from "../utils/index";
import { PokemonList } from "../types";


const getPokemonsController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const allPokemons: PokemonList[] = await getAllPokemons();
        res.status(200).json(allPokemons);
    } catch (error: any) {
        res.status(500).json({message: "Something went wrong, error: ", error: error.message});
    }
}

export default getPokemonsController;