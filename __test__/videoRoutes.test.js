'use strict';

const { app } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(app);
describe('testing the game routes', () => {
  test('render the private page', async () => {
    let response = await request.get('/api/v1/playerDisc/:id');
    expect(response.status).toBe(200);
  });
  test('render the general room', async () => {
    let response = await request.get('/api/v1/pvp/');
    expect(response.status).toBe(200);
  });
  test('render the lose room', async () => {
    let response = await request.get('/api/v1/loser/:id');
    expect(response.status).toBe(200);
  });
  test('render the winner room', async () => {
    let response = await request.get('/api/v1/winner/:id');
    expect(response.status).toBe(200);
  });
});
