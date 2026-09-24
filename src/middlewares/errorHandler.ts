import { Request, Response as ExpressResponse, NextFunction } from 'express';
import { AppError } from '../utils/customError.js';
import Response from '../utils/response.js';

export const errorHandler = (
  err: Error,
  _req: Request,
  res: ExpressResponse,
  _next: NextFunction,
): ExpressResponse => {
  if (err instanceof AppError) {
    return Response(res, err.statusCode, false, err.message, null);
  }

  console.error('Unhandled Error:', err);
  return Response(res, 500, false, 'Internal server error', null);
};
