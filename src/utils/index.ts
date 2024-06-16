import dotenv from 'dotenv';
dotenv.config();
import { Types, Pokemon, PokemonList } from '../types';
import { PokemonModel, TypeModel } from '../db';


const { URL_API_TYPES, URL_API, URL_API_ID } = process.env as {
    URL_API_TYPES: string;
    URL_API: string;
    URL_API_ID: string;
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

export const getPokemonById = async (id: string): Promise<Pokemon> => {
    const response = await fetch(`${URL_API_ID}/${id}`);
    const data = await response.json();
    const filtredPokemon : Pokemon = {
        id: data.id,
        name: data.name,
        hp: data.stats[0].base_stat,
        str: data.stats[1].base_stat,
        def: data.stats[2].base_stat,
        spd: data.stats[5].base_stat,
        height: data.height,
        weight: data.weight,
        img: data.sprites.other['official-artwork'].front_default,
        types: data.types.map((type: { type: { name: string } }) => type.type.name)
    }
    return filtredPokemon;
}