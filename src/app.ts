import express from 'express';
import errorHandler from './middlewares/errorHandler.ts';
import CustomerRouter from './routes/customer.router.ts';
import InvoiceRouter from './routes/invoice.route.ts';

const app = express();

app.use(express.json());

app.use('/customers', CustomerRouter);
app.use('/invoices', InvoiceRouter);

app.use((_request, response) => {
	response.status(404).json({
		message: 'Not found!'
	});
});

app.use(errorHandler);

export default app;
