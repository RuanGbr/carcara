import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type {
	CreateCustomer,
	UpdateCustomer
} from '../schemas/customer.schema.ts';
import type { Customer } from '../types.ts';

export async function findAllCustomers(): Promise<Customer[]> {
	return await prisma.customer.findMany({ orderBy: { createdAt: 'desc' } });
}

export async function findCustomerById(id: number): Promise<Customer> {
	const customer = await prisma.customer.findUnique({ where: { id } });

	if (!customer) {
		throw new NotFoundError(`Cliente com id ${id} não encontrado.`);
	}

	return customer;
}

export async function insertCustomer({
	name,
	email
}: CreateCustomer): Promise<Customer> {
	return prisma.customer.create({ data: { name, email } });
}

export async function modifyCustomer(
	id: number,
	{ name, email, imageUrl }: UpdateCustomer
): Promise<Customer> {
	await findCustomerById(id);

	return prisma.customer.update({
		where: { id },
		data: { name, email, imageUrl }
	});
}

export async function removeCustomer(id: number): Promise<void> {
	await findCustomerById(id);

	await prisma.customer.delete({ where: { id } });
}
