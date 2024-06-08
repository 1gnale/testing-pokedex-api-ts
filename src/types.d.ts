export readonly type  Types = 'normal' | 'fighting' | 'flying' | 'poison' | 'ground' | 'rock' | 'bug' | 'ghost' | 'steel' | 'fire' | 'water' | 'grass' | 'electric' | 'psychic' | 'ice' | 'dragon' | 'dark' | 'fairy' | 'stellar' | 'unknown'

export readonly type Pokemon = {
    id: number;
    name: string;
    hp: number;
    str: number;
    def: number;
    spd: number;
    height: number;
    weight: number;
    img: string;
    types: Types[];
};

export readonly type PokemonList = {
    name: string;
    id: number;
}