import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'
import Type from './models/Type'
import Pokemon from './models/Pokemon'

dotenv.config()

const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false,
  native: false
})


export const TypeModel = Type(sequelize)
export const PokemonModel = Pokemon(sequelize)


PokemonModel.belongsToMany(TypeModel, { through: 'pokeType' })
TypeModel.belongsToMany(PokemonModel, { through: 'pokeType' })

export default {
  conn: sequelize
}
