import { z } from 'zod';

export const createInvoiceShema = z.object({
	amount: z
		.number('Entrada inválida: esperava-se um número')
		.positive('O valor deve ser maior que zero.'),
	status: z.enum(['PENDING', 'PAID']),
	date: z.coerce.date('Data inválida'),
	customerId: z
		.number('Entrada inválida: esperava-se um número')
		.positive('O valor deve ser maior que zero.')
});
export const UpDateInvoiceSchema = createInvoiceShema.partial();

export type CreateInvoice = z.infer<typeof createInvoiceShema>;
export type UpdateInvoice = z.infer<typeof UpDateInvoiceSchema>;
