import * as express from 'express';
import * as authController from '../controllers/auth.controller';

const router = express.Router();

router.route('/login')
    .post(authController.login);

export default router;