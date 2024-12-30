import request from 'supertest';
import app from '../src/app';

describe('Sample Test', () => {
  it('should respond with a welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Welcome to the API');
  });
});
