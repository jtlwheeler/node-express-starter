import * as express from 'express';
import * as userController from '../controllers/user.controller';
import { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.route('/signUp')
    .post(userController.signUp);

export default router;
