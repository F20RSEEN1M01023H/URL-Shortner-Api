import { Router } from 'express';
import { createLink, getStats } from '../controllers/linkControllers';
import { rateLimit } from '../middlewares/rateLimit';
import { validate } from '../middlewares/validate';
import { createLinkSchema, codeParamSchema } from '../validations/linkValidations';

const router = Router();

router.post(
  '/',
  rateLimit({ windowMs: 60_000, max: 10 }),
  validate(createLinkSchema, 'body'),
  createLink,
);

router.get('/:code', validate(codeParamSchema, 'params'), getStats);

export default router;
