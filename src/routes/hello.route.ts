import * as express from 'express';
import { hello } from '../controllers/hello.controller';
import paramValidation from '../config/param-validation';

const router = express.Router();

router.route('/')
    .get(hello);

export default router;