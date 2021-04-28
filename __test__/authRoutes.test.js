'use strict';

const { app } = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(app);

describe('testing the signup/ signin', () => {
  test('it should create an admin successfuly', async () => {
    const response = await request.post('/api/v1/signup').send({
      username: 'Omar',
      email: 'omar@example.com',
      password: '1234',
      role: 'admin',
      imgUrl: 'empty',
    });
    expect(response.status).toEqual(201);
  });
  test('it should not signin for a user that does not exist', async () => {
    const response = await request.post('/api/v1/signin').auth({
      email: 'omar@exampl.com',
      password: '1234',
    });
    expect(response.status).toEqual(403);
  });
  test('it should signin for a user that  exist', async () => {
    const response = await request
      .post('/api/v1/signin')
      .auth('omar@example.com', '1234');
    expect(response.status).toBe(200);
  });
});
