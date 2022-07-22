import request from 'supertest';
import app from '../app';

describe('home route', () => {
  //   test('returns the home page with a message', async () => {
  //     await request(app).get('/').expect('Home').expect(200);
  //   });
  // });

  // describe('questions routes', () => {
  //   test('get all questions', async () => {
  //     await request(app)
  //       .get('/api/v1/questions')
  //       .expect('Content-Type', /json/)
  //       .expect(200);
  //   });

  //   test('get a specific question', async () => {
  //     await request(app)
  //       .get('/api/v1/questions/1')
  //       .expect('Content-Type', /json/)
  //       .expect(200);
  //   });
  //   test('if the question does not exist', async () => {
  //     await request(app)
  //       .get('/api/v1/quesitons/99999')
  //       .expect(400)
  //       .expect('Content-Type', /html/);
  //   });
  //   test('post a question', async () => {
  //     await request(app)
  //       .post('/api/v1/questions')
  //       .send({ title: 'Question', description: 'This is a question' })
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(201);
  //   });
  //   test('update a question', async () => {
  //     await request(app)
  //       .patch('/api/v1/questions/1')
  //       .send({ title: 'New Question', description: 'This is a new question' })
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(201);
  //   });
  //   test('if update a question fails', async () => {
  //     await request(app)
  //       .patch('/api/v1/questions/99999999')
  //       .send({ title: 'New Question', description: 'This is a new question' })
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(404);
  //   });

  //   test('delete a question', async () => {
  //     await request(app)
  //       .delete('/api/v1/questions/2')
  //       .expect({ message: 'Question deleted' })
  //       .expect(201);
  //   });
  //   test('cannot delete question because it doesnt exist', async () => {
  //     await request(app)
  //       .delete('/api/v1/questions/x')
  //       .expect({ message: 'Question not found' })
  //       .expect(404);
  //   });

  //   test('post an answer', async () => {
  //     await request(app)
  //       .post('/api/v1/questions/1/answers')
  //       .send({ answer: 'This is the answer to question 1' })
  //       .set('Accept', 'application/json')
  //       .expect('Content-Type', /json/)
  //       .expect(201);
  //   });
  //   test('get answers for a specific questions', async () => {
  //     await request(app)
  //       .get('/api/v1/questions/1/answers/')
  //       .expect('Content-Type', /json/)
  //       .expect(200);
  //   });
  //   test('no answers for specific question', async () => {
  //     await request(app)
  //       .get('/api/v1/questions/9999999/answers/')
  //       .expect('Content-Type', /json/)
  //       .expect(404);
  //   });
  test('if the question does not exist', async () => {
    const res = await request(app).get('/api/v1/quesitons/');

    console.log(res.status, '==============>');
    console.log(res.body, '==============>');
    console.log(res);
  });
});
