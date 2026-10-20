import type { Request, Response } from 'express';
import type { CreateInvoice, UpdateInvoice } from '../schemas/invoice.shema.ts';
import * as InvoiceService from '../services/invoice.service.ts';

export function getAllInvoice(req: Request, res: Response) {
	const page = Number(req.query.page) || 1;

	const invoices = InvoiceService.findAllInvoices(page);

	res.status(200).json(invoices);
}

export function getInvoiceById(req: Request, res: Response) {
	const id = Number(req.params.id);

	const invoice = InvoiceService.findInvoiceById(id);

	res.status(200).json(invoice);
}

export function createInvoice(req: Request, res: Response) {
	const { amount, customerId, status, date } = req.body as CreateInvoice;

	const invoice = InvoiceService.insertInvoice({
		amount,
		customerId,
		status,
		date
	});

	res.status(201).json(invoice);
}

export function updateInvoice(req: Request, res: Response) {
	const id = Number(req.params.id);

	const { amount, customerId, status, date } = req.body as UpdateInvoice;

	const invoice = InvoiceService.modifyInvoice(id, {
		amount,
		customerId,
		status,
		date
	});

	res.status(200).json(invoice);
}

export function deleteInvoice(req: Request, res: Response) {
	const id = Number(req.params.id);

	InvoiceService.removeInvoice(id);

	res.status(204).send();
}
