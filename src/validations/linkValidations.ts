import Joi from 'joi';

const strictUrlValidation = (value: string, helpers: Joi.CustomHelpers) => {
  try {
    const parsed = new URL(value);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return helpers.message({ custom: 'Only http: and https: protocols are allowed' });
    }
    return value;
  } catch {
    return helpers.message({ custom: 'Invalid URL format' });
  }
};

export const createLinkSchema = Joi.object({
  url: Joi.string().trim().max(2048).required().custom(strictUrlValidation).messages({
    'string.base': 'URL must be a string',
    'string.empty': 'URL cannot be empty',
    'string.max': 'URL length cannot exceed 2048 characters',
    'any.required': 'URL is required',
  }),
});

export const codeParamSchema = Joi.object({
  code: Joi.string()
    .pattern(/^[0-9a-zA-Z]{7}$/)
    .required()
    .messages({
      'string.pattern.base': 'Malformed short link code',
      'any.required': 'Code path parameter is required',
    }),
});
