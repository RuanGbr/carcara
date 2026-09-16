import type { InvoiceStatus } from '../../prisma/generated/client.ts';
import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type { CreateInvoice, UpdateInvoice } from '../schemas/invoice.shema.ts';

export async function findAllInvoices(page: number) {
	return prisma.invoice.findMany({
		include: { customer: true },
		orderBy: { date: 'desc' },
		skip: (page - 1) * 10,
		take: 10
	});
}

export async function findInvoiceById(id: number) {
	const invoice = await prisma.invoice.findUnique({
		where: { id },
		include: { customer: true }
	});

	if (!invoice) {
		throw new NotFoundError(`Fatura com id ${id} não encontrada.`);
	}

	return invoice;
}

export async function insertInvoice(
	customerId: number,
	{ amount, status, date }: CreateInvoice
) {
	return prisma.invoice.create({
		data: {
			amount,
			status,
			date,
			customer: { connect: { id: customerId } }
		},
		include: { customer: true }
	});
}

export async function modifyInvoice(
	id: number,
	{ amount, status, date }: UpdateInvoice
) {
	await findInvoiceById(id);

	return prisma.invoice.update({
		where: { id },
		data: { amount, status, date },
		include: { customer: true }
	});
}

export async function removeInvoice(id: number): Promise<void> {
	await findInvoiceById(id);

	await prisma.invoice.delete({ where: { id } });
}
