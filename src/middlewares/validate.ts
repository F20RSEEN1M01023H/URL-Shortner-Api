import { RequestHandler } from 'express';
import { Schema } from 'joi';
import { AppError } from '../utils/customError.js';

type RequestSegment = 'body' | 'params' | 'query';

export const validate = (schema: Schema, segment: RequestSegment = 'body'): RequestHandler => {
  return (req, _res, next): void => {
    const { error, value } = schema.validate(req[segment], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message).join(', ');
      return next(new AppError(400, errorMessage));
    }

    if (segment === 'body') {
      req.body = value;
    } else {
      Object.assign(req[segment], value);
    }

    next();
  };
};
