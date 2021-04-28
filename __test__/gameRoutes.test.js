'use strict';

const { app } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(app);
let id;
let id2;
let token;
describe('testing the game routes', () => {
  test('create an admin', async () => {
    let response = await request.post('/api/v1/signup').send({
      username: 'omar',
      email: 'omar@example.com',
      password: '1234',
      imgUrl: 'empty',
      role: 'admin',
    });
    token = response.body.token;
    id2 = response.body._id;
    expect(response.status).toBe(201);
  });
  test('Should create player successfully', async () => {
    let response = await request
      .post('/api/v1/players')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'ahmad',
        email: 'ahmad@example.com',
        password: '1234',
        imgUrl: 'empty',
        role: 'admin',
      });
    id = response.body._id;
    // console.log('__id__', response.body._id, id);
    expect(response.status).toBe(200);
  });
  test('Should update player successfully', async () => {
    let response = await request
      .put(`/api/v1/players/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'Ahmad' });
    expect(response.status).toBe(200);
  });
  test('Should return errors on update player successfully', async () => {
    let response = await request
      .put(`/api/v1/players/${'sjdklfjsld'}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ username: 'Ahmad' });
    expect(response.status).toBe(500);
  });
  test('Should send report successfully', async () => {
    let response = await request
      .post(`/api/v1/report/player/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ message: 'first message' });
    expect(response.status).toBe(200);
  });
  test('Should add friend successfully', async () => {
    let response = await request
      .post(`/api/v1/players/addFriend`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: id2, friendId: id });
    expect(response.status).toBe(200);
  });
  test('Should get player friends successfully', async () => {
    let response = await request
      .get(`/api/v1/players/friends/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  test('Should get player profile successfully', async () => {
    let response = await request
      .get(`/api/v1/profile`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  test('Should remove player friend profile successfully', async () => {
    let response = await request
      .post(`/api/v1/players/removeFriend`)
      .set('Authorization', `Bearer ${token}`)
      .send({ userId: id2, friendId: id });
    expect(response.status).toBe(200);
  });
  test('Should search successfully', async () => {
    let response = await request
      .get(`/api/v1/search/${'Ahmad'}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  test('Should win or lose successfully', async () => {
    let response = await request
      .post(`/api/v1/players/game`)
      .send({ gamePlayers: ['omar', 'ahmad', 'ammar'], winner: 'omar' });
    expect(response.status).toBe(200);
  });
  test('Should get top players successfully', async () => {
    let response = await request.get(`/api/v1/topPlayers`);
    expect(response.status).toBe(200);
  });
  test('Should random joke successfully', async () => {
    let response = await request.get(`/api/v1/joke`);
    expect(response.status).toBe(200);
  });
  test('Should random youtube video successfully', async () => {
    let response = await request.get(`/api/v1/youtube`);
    expect(response.status).toBe(200);
  });
  test('Should get all players successfully', async () => {
    let response = await request
      .get(`/api/v1/players`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  test('Should get player by id successfully', async () => {
    let response = await request
      .get(`/api/v1/players/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
  test('Should return an error player by id successfully', async () => {
    let response = await request
      .get(`/api/v1/players/skldf`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(500);
  });
  test('Should delete admin successfully', async () => {
    let response = await request
      .delete(`/api/v1/players/${id2}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
});
