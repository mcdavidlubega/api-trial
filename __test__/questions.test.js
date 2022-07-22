import request from 'supertest';
import app from '../app';

describe('home route', () => {
  test('returns the home page with a message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
  });
});

describe('questions routes', () => {
  test('get all questions', async () => {
    const res = await request(app).get('/api/v1/questions');
    expect(res.status).toBe(200);
    expect(res.body[0].title).toEqual('Question 1');
  });

  test('if there are no questions', async () => {
    const res = await request(app).get('/api/v1/questions');
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual('No question not found');
  });

  test('if the question does not exist', async () => {
    const res = await request(app).get('/api/v1/questions/6');
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual('Question was not found');
  });
  test('post a question', async () => {
    const res = await request(app)
      .post('/api/v1/questions')
      .send({ title: 'Question', description: 'This is a question' });
    expect(res.status).toBe(201);
  });
  test('update a question', async () => {
    const res = await request(app)
      .patch('/api/v1/questions/1')
      .send({ title: 'New Question', description: 'This is a new question' })
      .set('Accept', 'application/json');
    expect(res.status).toBe(201);
  });
  test('if update a question fails', async () => {
    const res = await request(app)
      .patch('/api/v1/questions/6')
      .send({ title: 'New Question', description: 'This is a new question' });
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual('This question doesnt exist');
  });
  test('delete a question', async () => {
    const res = await request(app).delete('/api/v1/questions/2');
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual('Question deleted');
  });
  test('cannot delete question because it doesnt exist', async () => {
    const res = await request(app).delete('/api/v1/questions/6');
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual('Question not found');
  });
  test('post an answer', async () => {
    const res = await request(app)
      .post('/api/v1/questions/1/answers')
      .send({ answer: 'This is the answer to question 1' });
    expect(res.status).toBe(201);
    expect(res.body.message).toEqual('Your answer was successfully submited');
  });
  test('get answers for a specific questions', async () => {
    const res = await request(app).get('/api/v1/questions/1/answers/');
    expect(res.status).toBe(200);
    expect(res.body[0]).toEqual({
      id: 1,
      questionId: 1,
      answer: 'This is the answer to question 1',
    });
  });
  test('no answers for specific question', async () => {
    const res = await request(app).get('/api/v1/questions/6/answers/');
    expect(res.status).toBe(404);
    expect(res.body.message).toEqual('There are no answers for this question');
  });
});
