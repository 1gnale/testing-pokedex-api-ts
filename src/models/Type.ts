import { DataTypes, Model, Sequelize, ModelStatic } from 'sequelize';
import {TypesList} from '../types';
 
export default (sequelize: Sequelize): ModelStatic<Model<TypesList>> => {
    return sequelize.define('type', {
        name: {
            type: DataTypes.STRING,
            unique: true,
        }
    },
    {
        timestamps: false,
    });
}