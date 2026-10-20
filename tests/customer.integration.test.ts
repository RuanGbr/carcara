import request from 'supertest';
import app from '../src/app.ts';
import prisma from '../src/lib/prisma.ts';

beforeEach(async () => {
	await prisma.invoice.deleteMany();
	await prisma.customer.deleteMany();
});
afterAll(async () => {
	await prisma.$disconnect();
});

describe('GET / customers', () => {
	test('devolve 404 quando o client não existe', async () => {
		const response = await request(app).get('/customer/999');

		expect(response.status).toBe(404);
		expect(response.body.message).toBe('Cliente não encontrado.');
	});
});

describe('POST /customer', () => {
	test('cria um cliente e devolve 201 com o registro criado', async () => {
		const response = await request(app).post('/customers').send({
			name: 'Timóteo Besa',
			email: 'timoteo@gmail.com'
		});
		expect(response.status).toBe(201);
		expect(response.body).toMatchObject({
			name: 'Timóteo Bessa',
			email: 'timoteo@gmail.com'
		});
	});
});
