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
  test('Should create post successfully', async () => {
    let response = await request
      .post('/api/v1/addPost')
      .set('Authorization', `Bearer ${token}`)
      .send({
        userId: id2,
        title: 'first post',
        content: 'jokes',
      });
    id = response.body._id;
    expect(response.status).toBe(200);
  });
  test('Should update post successfully', async () => {
    let response = await request
      .put('/api/v1/updatePost')
      .set('Authorization', `Bearer ${token}`)
      .send({
        postId: id,
        title: 'first post',
        content: 'updated',
      });
    expect(response.status).toBe(200);
  });
  test('Should return an error update post successfully', async () => {
    let response = await request
      .put('/api/v1/updatePost')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(500);
  });
  test('Should get post successfully', async () => {
    let response = await request
      .get(`/api/v1/posts/${id2}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  test('Should delete post successfully', async () => {
    let response = await request
      .delete(`/api/v1/removePost/${id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });
  test('Should return error delete post with no id successfully', async () => {
    let response = await request
      .delete(`/api/v1/removePost/s`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(500);
  });
});
