import server from './src/app';
import seq from './src/db';
import dotenv from 'dotenv';

dotenv.config();

const { conn } = seq;

conn.sync({ force: false }).then(() => {
  server.listen(process.env.PORT, () => {
    console.log('%s listening at 3001');
  });
});