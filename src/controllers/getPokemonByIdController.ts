import { Request, Response } from "express";
import { getPokemonById } from "../utils/index";

const getPokemonByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: string = req.params.id;
        const pokemon = await getPokemonById(id);
        res.status(200).json(pokemon);
    } catch (error: any) {
        res.status(404).json({ message: "Pokemon not found" });
    }
}

export default getPokemonByIdController;