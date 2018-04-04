import * as express from 'express';
import { hello } from '../controllers/hello.controller';

const router = express.Router();

router.route('/')
    .get(hello);

export default router;