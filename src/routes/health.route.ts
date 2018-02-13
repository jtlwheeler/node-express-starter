import * as express from 'express';
import { Request, Response } from 'express';
import { healthCheck } from '../controllers/health.controller';

const router = express.Router();

router.route('/')
    .get(healthCheck);

export default router;