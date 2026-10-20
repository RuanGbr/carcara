import { Router } from 'express';
import * as InvoiceController from '../controllers/invoice.controller.ts';
import validate from '../middlewares/validate.ts';
import {
	createInvoiceShema,
	UpDateInvoiceSchema
} from '../schemas/invoice.shema.ts';

const router = Router();

router.get('/', InvoiceController.getAllInvoice);
router.get('/:id', InvoiceController.getInvoiceById);
router.post('/', validate(createInvoiceShema), InvoiceController.createInvoice);
router.put(
	'/:id',
	validate(UpDateInvoiceSchema),
	InvoiceController.updateInvoice
);
router.delete('/:id', InvoiceController.deleteInvoice);

export default router;
