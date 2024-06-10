import dotenv from 'dotenv';
dotenv.config();
import { Types } from '../types';

const { URL_API_TYPES } = process.env as {
    URL_API_TYPES: string;
  };

export const getAllTypes = async (): Promise<{name: Types}[]> => {
    const response = await fetch(URL_API_TYPES);
    const data = await response.json();
    const allTypes = data.results;

    const cleanTypes: {name: Types}[] = allTypes.map((type: { name: string }) => {
        return {
            name: type.name
        }
    });

    return cleanTypes;
}