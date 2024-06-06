import request from 'supertest';
import app from '../app';

describe('basic route tests', () => {
  it('/pokemons should responds with a status 200', async () => {
    const response = await request(app).get('/pokemons');
    expect(response.statusCode).toBe(200);
  });

  it('/types should responds with a status 200', async () => {
    const response = await request(app).get('/types');
    expect(response.statusCode).toBe(200);
  });
});