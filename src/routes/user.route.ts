import * as express from 'express';
import paramValidation from '../config/param-validation';
import * as userController from '../controllers/user.controller';

const router = express.Router();

router.route('/signUp')
    .post(userController.signUp);

export default router;