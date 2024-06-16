import { NextFunction, Request, Response,  } from "express";
import { getPokemonByName } from "../utils/index";

const getPokemonByNameController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const name: string = req.query.name as string;
        if(name) {
        const pokemon = await getPokemonByName(name);
        if (pokemon.length === 0) {
            res.status(404).json({message: "Pokemon not found"});
            return;
        }
        res.status(200).json(pokemon);
    }
        else {
         next();
        }
    } catch (error: any) {
        res.status(500).json({message: "Something went wrong, error: ", error: error.message});
    }
}

export default getPokemonByNameController;