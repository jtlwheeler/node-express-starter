import * as express from 'express';
import * as authController from '../controllers/auth.controller';
import { requestValidator } from '../controllers/request-validator';
import { ParamValidation } from '../config/param-validation';

const router = express.Router();

router.route('/login')
    .post(requestValidator(ParamValidation.login), authController.login);

export default router;