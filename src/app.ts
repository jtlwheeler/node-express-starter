import config from './config/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes/index.route';

const app = express();
app.set('port', config.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', routes);

module.exports = app;
