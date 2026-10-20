import { NotFoundError } from '../errors/index.ts';
import prisma from '../lib/prisma.ts';
import type { CreateInvoice, UpdateInvoice } from '../schemas/invoice.shema.ts';

export async function findAllInvoices(page: number) {
	const invoices = await prisma.invoice.findMany({
		include: { customer: true },
		orderBy: { date: 'desc' },
		skip: (page - 1) * 10,
		take: 10
	});

	return invoices;
}

export async function findInvoiceById(id: number) {
	const invoice = await prisma.invoice.findUnique({
		where: {
			id
		},
		include: { customer: true }
	});

	if (!invoice) {
		throw new NotFoundError(`Fatura com id ${id} não encontrada.`);
	}

	return invoice;
}

export async function insertInvoice({
	amount,
	customerId,
	status,
	date
}: CreateInvoice) {
	const invoice = await prisma.invoice.create({
		data: {
			amount,
			customer: { connect: { id: customerId } },
			status,
			date
		}
	});

	return invoice;
}

export async function modifyInvoice(
	id: number,
	{ amount, customerId, status, date }: UpdateInvoice
) {
	await findInvoiceById(id);

	const invoice = await prisma.invoice.update({
		where: {
			id
		},
		data: {
			amount,
			customerId,
			date,
			status
		},
		include: {
			customer: true
		}
	});

	return invoice;
}

export async function removeInvoice(id: number): Promise<void> {
	await findInvoiceById(id);

	await prisma.invoice.delete({
		where: {
			id
		}
	});
}
