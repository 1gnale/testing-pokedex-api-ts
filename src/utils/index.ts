import dotenv from 'dotenv';
dotenv.config();
import { Types, Pokemon, PokemonList } from '../types';
import { PokemonModel, TypeModel } from '../db';


const { URL_API_TYPES, URL_API } = process.env as {
    URL_API_TYPES: string;
    URL_API: string;
};

export const getAllTypes = async (): Promise<{ name: Types }[]> => {
    const response = await fetch(URL_API_TYPES);
    const data = await response.json();
    const allTypes = data.results;

    const cleanTypes: { name: Types }[] = allTypes.map((type: { name: string }) => {
        return {
            name: type.name
        }
    });

    return cleanTypes;
}

const getPokemonsDB = async (): Promise<Pokemon[]> => {
    const dbPokemons = await PokemonModel.findAll({
        include: {
            model: TypeModel,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    });

    const dbPokemonsMapped = dbPokemons.map(pokemon => {
        return {
            id: pokemon.getDataValue('id'),
            name: pokemon.getDataValue('name'),
            hp: pokemon.getDataValue('hp'),
            str: pokemon.getDataValue('str'),
            def: pokemon.getDataValue('def'),
            spd: pokemon.getDataValue('spd'),
            height: pokemon.getDataValue('height'),
            weight: pokemon.getDataValue('weight'),
            img: pokemon.getDataValue('img'),
            types: pokemon.getDataValue('types').map((e: any) => e.name)
        }
    });

    return dbPokemonsMapped;
}

const getPokemonsApi = async (): Promise<PokemonList[]> => {
    const apiPokemons = await fetch(URL_API)
        .then(res => res.json())
        .then(data => data.results);

    const apiPokemonsMapped: PokemonList[] = apiPokemons.map((pokemon: { name: string, url: string }) => {
        return {
            name: pokemon.name,
            id: pokemon.url.split('/')[6]
        }
    });

    return apiPokemonsMapped;
}

export const getAllPokemons = async (): Promise<(PokemonList | Pokemon)[]> => {
    const dbPokemons = await getPokemonsDB();
    const apiPokemons = await getPokemonsApi();

    return [...dbPokemons, ...apiPokemons];
}

export const getPokemonByName = async (name: string): Promise<PokemonList[]> => {
    const allPokemons = await getAllPokemons();
    const searchedPokemon = allPokemons.filter((pokemon) => pokemon.name.toLowerCase().includes(name.toLowerCase()));

    return searchedPokemon;
}