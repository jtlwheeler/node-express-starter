import * as express from 'express';
import * as authController from '../controllers/auth.controller';
import { requestValidator } from '../middleware/request-validator';
import { ParamValidation } from '../config/param-validation';
import * as expressJwt from 'express-jwt';
import config from '../config/config';

const router = express.Router();

router.route('/login')
    .post(requestValidator(ParamValidation.login), authController.login);

router.route('/secret')
    .get(expressJwt({ secret: config.jwtSecret}), authController.secret);

export default router;