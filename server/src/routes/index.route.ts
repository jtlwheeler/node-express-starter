import * as express from 'express';
import helloRoute from '../routes/hello.route';
import healthRoute from '../routes/health.route';
import userRoute from '../routes/user.route';
import authRoute from '../routes/auth.route';

const router = express.Router();

router.use('/health', healthRoute);
router.use('/hello', helloRoute);
router.use('/user', userRoute);
router.use('/auth', authRoute);

export default router;