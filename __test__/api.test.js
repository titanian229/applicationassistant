const request = require('supertest');
const { app, server } = require('../server');

afterAll(async (done) => {
    await server.close(done);
});

describe('Login API', () => {
    it('Throwing error for missing email / password', async () => {
        const response = await request(app).post('/login');
        expect(response.status).toBe(403);
    });
    // it('Throwing error for improper sortBy and direction', async () => {
    //     const response = await request(app).get('/api/posts?tags=tech&sortBy=fish');
    //     expect(response.status).toBe(400);
    // });
    // it('Returns posts for posts request', async () => {
    //     const response = await request(app).get('/api/posts?tags=tech,health');
    //     expect(response.status).toBe(200);
    //     expect(response.body).toHaveProperty('posts')
    // });
});

describe('Ping API', () => {
    it('Server is up', async () => {
        const response = await request(app).get('/api/ping');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('success');
        expect(response.body.success).toBe(true);
    });
});
