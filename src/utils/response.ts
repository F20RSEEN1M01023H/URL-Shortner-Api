import { Response as ExpressResponse } from 'express';

const Response = (
  res: ExpressResponse,
  statusCode: number,
  success: boolean,
  message: string,
  data: unknown = null,
): ExpressResponse => {
  return res.status(statusCode).json({
    success,
    statusCode,
    data,
    message,
  });
};

export default Response;
