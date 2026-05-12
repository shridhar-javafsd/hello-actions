import request from 'supertest';
import app from './app';

test('GET / returns 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
});

test('GET / returns hello', async () => {
    const res = await request(app).get('/');
    expect(res.text).toContain('Hello');
});
