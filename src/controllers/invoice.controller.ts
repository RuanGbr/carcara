import type { Request, Response } from 'express';
import type { CreateInvoice, UpdateInvoice } from '../schemas/invoice.shema.ts';
import * as InvoiceService from '../services/invoice.service.ts';

export async function getAllInvoice(req: Request, res: Response) {
	const page = Number(req.query.page) || 1;
	const invoices = await InvoiceService.findAllInvoices(page);
	res.status(200).json(invoices);
}
export async function getInvoiceById(req: Request, res: Response) {
	const id = Number(req.params.id);
	const invoice = await InvoiceService.findInvoiceById(id);
	res.status(200).json(invoice);
}

export async function createInvoice(req: Request, res: Response) {
	const { amount, customerId, status, date } = req.body as CreateInvoice;
	const invoice = await InvoiceService.insertInvoice({
		amount,
		customerId,
		status,
		date
	});
	res.status(201).json(invoice);
}
export async function updateInvoice(req: Request, res: Response) {
	const id = Number(req.params.id);
	const { amount, customerId, status, date } = req.body as UpdateInvoice;
	const invoice = await InvoiceService.modifyInvoice(id, {
		amount,
		customerId,
		status,
		date
	});
	res.status(200).json(invoice);
}
export async function deleteInvoice(req: Request, res: Response) {
	const id = Number(req.params.id);

	await InvoiceService.removeInvoice(id);

	res.status(204).send();
}
