import server from './src/app';
import seq from './src/db';
import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { Express } from 'express';

dotenv.config();

const conn: Sequelize = seq.conn;
const sv: Express = server;

conn.sync({ force: false }).then(() => {
  sv.listen(process.env.PORT, () => {
    console.log('%s listening at 3001');
  });
});