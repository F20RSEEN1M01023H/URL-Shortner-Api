import express, { Application, Request, Response as ExpressResponse } from 'express';
import linkRoutes from './routes/linkRoute';
import redirectRoutes from './routes/redirectRoute';
import { errorHandler } from './middlewares/errorHandler';
import Response from './utils/response.js';

const app: Application = express();

app.use(express.json());

app.use('/api/links', linkRoutes);

app.use('/', redirectRoutes);

app.use((_req: Request, res: ExpressResponse) => {
  Response(res, 404, false, 'Resource or endpoint not found', null);
});

app.use(errorHandler);

export default app;
