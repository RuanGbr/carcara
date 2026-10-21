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

describe('GET /customers', () => {
	test('devolve 404 quando o cliente não existe', async () => {
		const res = await request(app).get('/customers/999');

		expect(res.status).toBe(404);
		expect(res.body.message).toBe('Cliente com id 999 não encontrado.');
	});
});

describe('POST /customer', () => {
	test('cria um cliente e devolve 201 com o registro criado', async () => {
		const res = await request(app).post('/customers').send({
			name: 'Jota nl',
			email: 'jotadl@gmail.com'
		});

		expect(res.status).toBe(201);
		expect(res.body).toMatchObject({
			name: 'Jota nl',
			email: 'jotadl@gmail.com'
		});
	});
	test('retorna error 400 quando o email é inválido', async () => {
		const res = await request(app).post('/customers').send({
			name: 'Jota nl',
			email: 'não é um email'
		});

		expect(res.status).toBe(400);
		expect(res.body.fields).toEqual(
			expect.arrayContaining([
				expect.objectContaining({ field: 'email' })
			])
		);
	});
});
