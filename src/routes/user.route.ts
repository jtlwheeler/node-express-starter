import * as express from 'express';
import * as userController from '../controllers/user.controller';
import { Request, Response, NextFunction } from 'express';
import { requestValidator } from '../middleware/request-validator';
import { ParamValidation } from '../config/param-validation';

const router = express.Router();

router.route('/signUp')
    .post(requestValidator(ParamValidation.signUp), userController.signUp);

export default router;
