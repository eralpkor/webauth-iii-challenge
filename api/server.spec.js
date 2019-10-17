const request = require('supertest');
const server = require('./server.js');

describe('server.js', () => {
  it('should return an OK status code from the index route', async () => {
    const statusCode = 200;

    const response = await request(server).get('/');

    expect(response.status).toEqual(statusCode);
  })
})
