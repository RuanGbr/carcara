import app from './app.ts';
import logger from './lib/logger.ts';

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
	logger.info(`Servidor rodando na porta ${port}`);
});
