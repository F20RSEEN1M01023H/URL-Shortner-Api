import express, { Application, Request, Response as ExpressResponse } from 'express';
import linkRoutes from './routes/linkRoute';
import redirectRoutes from './routes/redirectRoute';
import { errorHandler } from './middlewares/errorHandler';
import Response from './utils/response.js';

const app: Application = express();

app.use(express.json());

// API Endpoints
app.use('/api/links', linkRoutes);

// Catch-all Redirect Route mounted LAST among functional routes
app.use('/', redirectRoutes);

// 404 Handler for Unmatched Endpoints
app.use((_req: Request, res: ExpressResponse) => {
  Response(res, 404, false, 'Resource or endpoint not found', null);
});

// Centralized Error Middleware
app.use(errorHandler);

export default app;
