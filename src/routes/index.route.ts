import * as express from 'express';
import hello from './hello.route';
import { healthCheck } from '../controllers/health.controller';

const router = express.Router();

router.use('/health', healthCheck);
router.use('/hello', hello);

export default router;