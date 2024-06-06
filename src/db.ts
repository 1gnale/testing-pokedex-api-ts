import dotenv from 'dotenv';
import {Sequelize} from 'sequelize';
import fs from 'fs';
import path from 'path';


dotenv.config();


const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT
} = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
  logging: false, 
  native: false, 
});

const basename = path.basename(__filename);

const modelDefiners: any[] = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file: string) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file: string) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));


const { pokemon, type } = sequelize.models;


pokemon.belongsToMany(type, {through:"pokeType"})
type.belongsToMany(pokemon, {through:"pokeType"})

export default {
  ...sequelize.models, 
  conn: sequelize,    
};