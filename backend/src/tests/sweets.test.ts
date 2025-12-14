import request from 'supertest';
import { app } from '../server';
import Sweet from '../models/Sweet';
import User from '../models/User';

let token: string;
let adminToken: string;
let sweetId: string;

beforeAll(async () => {
    await Sweet.deleteMany({});
    await User.deleteMany({});

    // specific user for sweets test
    const adminRes = await request(app).post('/api/auth/register').send({
        username: 'adminUser',
        password: 'password',
        isAdmin: true
    });
    adminToken = adminRes.body.token;

    // We need to verify if the user is actually admin in DB because register endpoint might not allow setting isAdmin directly depending on implementation
    // Checking authController: 
    /*
    const user = await User.create({
      username,
      password,
      isAdmin: isAdmin || false,
    });
    */
    // So yes, it allows setting isAdmin.

    const userRes = await request(app).post('/api/auth/register').send({
        username: 'normalUser',
        password: 'password'
    });
    token = userRes.body.token;
});

describe('Sweet Endpoints', () => {
    it('should create a sweet (Admin)', async () => {
        const res = await request(app)
            .post('/api/sweets')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                name: 'Test Sweet',
                category: 'Test',
                price: 10,
                quantity: 100,
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.name).toEqual('Test Sweet');
        sweetId = res.body._id;
    });

    it('should get all sweets', async () => {
        const res = await request(app).get('/api/sweets');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should purchase a sweet', async () => {
        const res = await request(app)
            .post(`/api/sweets/${sweetId}/purchase`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.quantity).toEqual(99);
    });
});
