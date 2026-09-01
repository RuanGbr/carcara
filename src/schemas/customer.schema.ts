import { z } from 'zod';

export const createCustomerSchema = z.object({
	name: z
		.string('Entrada inválida: esperava-se um texto.')
		.min(
			1,
			'Muito curto: esperava-se um texto com pelo menos 1 caractere.'
		),
	email: z.email('Endereço de e-mail inválido.'),
	imageURL: z.url().optional()
});

export const updateCustomerSchema = z.object({
	name: z
		.string('Entrada inválida: esperava-se um texto')
		.min(1, 'Muito curto: esperava-se um texto com pelo menos 1 caractere.')
		.optional(),
	email: z.email('Endereço de e-mail inválido.').optional(),
	imagemUrl: z.url('Endereço de url inválido.').optional()
});

export type CreateCustomer = z.infer<typeof createCustomerSchema>;
export type UpdateCustomer = z.infer<typeof updateCustomerSchema>;
