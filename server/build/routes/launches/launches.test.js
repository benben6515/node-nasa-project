import request from 'supertest';
import app from '../../app.js';
describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
        const response = await request(app).get('/launches').expect('Content-Type', /json/).expect(200);
    });
});
describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'mission-001',
        rocket: 'rocket-001',
        target: 'mars',
        launchDate: '2023/06/01',
    };
    const completeLaunchDataWithoutDate = {
        mission: 'mission-001',
        rocket: 'rocket-001',
        target: 'mars',
    };
    const invalidLaunchData = {
        mission: 'mission-001',
        rocket: 'rocket-001',
        target: 'mars',
        launchDate: 'zoot',
    };
    test('It should respond with 201 created', async () => {
        // const response = request(app)
        // expect(response).toBe(200)
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);
        const requestDate = new Date(completeLaunchData.launchDate).valueOf();
        const responseDate = new Date(response.body.launchDate).valueOf();
        expect(response.body).toMatchObject(completeLaunchDataWithoutDate);
    });
    test('It should catch missing required properties', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response).toStrictEqual({ error: 'Missing required launch property' });
    });
    test('It should catch invalid dates', async () => {
        const response = await request(app)
            .post('/launches')
            .send(invalidLaunchData)
            .expect('Content-Type', /json/)
            .expect(400);
        expect(response).toStrictEqual({ error: 'Invalid launch date' });
    });
});
