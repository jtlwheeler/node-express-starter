import config from './config/config';
import { logger } from './config/logger';

logger.info(`Starting app in ${config.env} mode`);

const app = require('./app');

app.listen(app.get('port'), () => {
    logger.info(`Listening on port ${app.get('port')}`);
});