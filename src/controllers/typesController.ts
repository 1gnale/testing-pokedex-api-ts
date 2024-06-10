import { Request, Response } from 'express';
import { getAllTypes } from '../utils/index';
import seq from '../db';
import { Types } from '../types';

const { type } = seq.conn.models;

const typesController = async (_req: Request, res: Response): Promise<void> => {
    try {
        const allTypes : {name: Types}[] = await getAllTypes();
        const promises = allTypes.map((e) => {
            return type.findOrCreate({
                where: {name: e.name}
            });
        });
        await Promise.all(promises);
        const allTypesDB = await type.findAll();
        res.status(200).json(allTypesDB);
        
    } catch (error: any) {
        res.status(500).json({message: "Something went wrong, error: ", error: error.message});
    }
}

export default typesController
