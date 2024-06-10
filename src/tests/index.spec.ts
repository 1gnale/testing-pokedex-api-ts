import request, { Response } from 'supertest'
import app from '../app'
import seq from '../db'
import { Pokemon, PokemonList, TypesList, Types } from '../types'

describe('types route tests', () => {
  it('/types should responds with a status 200', async () => {
    const response: Response = await request(app).get('/types')
    expect(response.statusCode).toBe(200)
  })
  it('/types should responds with an array of types', async () => {
    const response: Response = await request(app).get('/types')
    const types: TypesList[] = response.body
    const typesNames: Types[] = types.map((type) => type.name)
    expect(typesNames.includes('normal')).toBe(true)
    expect(typesNames.includes('fighting')).toBe(true)
    expect(typesNames.includes('flying')).toBe(true)
    expect(typesNames.includes('poison')).toBe(true)
  })
})

describe('pokemon route tests', () => {
  it('GET /pokemons should responds with a status 200 & an array of pokemons', async () => {
    const response: Response = await request(app).get('/pokemons')
    const pokemons: PokemonList[] = response.body
    expect(response.statusCode).toBe(200)
    expect(pokemons[0].name).toBe('bulbasaur')
    expect(pokemons[0].id).toBe(1)
  })

  it('GET /pokemons/:id should responds with a status 200 & searched pokemon', async () => {
    const response: Response = await request(app).get('/pokemons/1')
    const pokemon: Pokemon = response.body
    expect(response.statusCode).toBe(200)
    expect(pokemon.id).toBe(1)
    expect(pokemon.name).toBe('bulbasaur')
    expect(pokemon.hp).toBe(45)
    expect(pokemon.str).toBe(49)
    expect(pokemon.def).toBe(49)
    expect(pokemon.spd).toBe(45)
    expect(pokemon.height).toBe(7)
    expect(pokemon.weight).toBe(69)
    expect(pokemon.img).toBe('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png')
    expect(pokemon.types).toEqual(['grass', 'poison'])
  })

  it('GET /pokemons/:id should responds with a status 404 in error case', async () => {
    const response: Response = await request(app).get('/pokemons/1xd1')
    expect(response.statusCode).toBe(404)
  })

  it('GET /pokemons?name=pikachu should responds with a status 200 & searched pokemon', async () => {
    const response: Response = await request(app).get('/pokemons?name=pikachu')
    const pokemon: PokemonList[] = response.body
    expect(response.statusCode).toBe(200)
    expect(pokemon[0].name).toBe('pikachu')
    expect(pokemon[0].id).toBe(25)
  })

  it('GET /pokemons?name=pid should responds with a status 200 & searched pokemons', async () => {
    const response: Response = await request(app).get('/pokemons?name=pid')
    const pokemons: PokemonList[] = response.body
    expect(response.statusCode).toBe(200)
    expect(pokemons[0].name).toBe('pidgey')
    expect(pokemons[0].id).toBe(16)
    expect(pokemons[1].name).toBe('pidgeotto')
    expect(pokemons[1].id).toBe(17)
    expect(pokemons[2].name).toBe('pidgeot')
    expect(pokemons[2].id).toBe(18)
    expect(pokemons[3].name).toBe('rapidash')
    expect(pokemons[3].id).toBe(78)
  })

  it('GET /pokemons?name=xdxdxdxd should responds with a status 404 in error case', async () => {
    const response: Response = await request(app).get('/pokemons?name=xdxdxdxd')
    expect(response.statusCode).toBe(404)
  })
})

afterAll(async () => {
  await seq.conn.close()
})
