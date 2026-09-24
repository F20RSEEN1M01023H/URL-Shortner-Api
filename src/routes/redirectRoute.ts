import { Router } from 'express';
import { redirectToUrl } from '../controllers/linkControllers';
import { validate } from '../middlewares/validate';
import { codeParamSchema } from '../validations/linkValidations';

const router = Router();

router.get('/:code', validate(codeParamSchema, 'params'), redirectToUrl);

export default router;
