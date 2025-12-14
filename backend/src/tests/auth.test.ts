import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../server';
import User from '../models/User';

beforeAll(async () => {
    await User.deleteMany({});
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Auth Endpoints', () => {
    it('should register a new user', async () => {
        const res = await request(app).post('/api/auth/register').send({
            username: 'testuser',
            password: 'testpassword',
        });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

    it('should login the user', async () => {
        const res = await request(app).post('/api/auth/login').send({
            username: 'testuser',
            password: 'testpassword',
        });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should not login with wrong password', async () => {
        const res = await request(app).post('/api/auth/login').send({
            username: 'testuser',
            password: 'wrongpassword',
        });
        expect(res.statusCode).toEqual(401);
    });
});
