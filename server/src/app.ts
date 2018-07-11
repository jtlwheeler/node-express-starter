import config from './config/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes/index.route';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import * as cors from 'cors';

const passportConfig = require('./config/passport');

(<any>mongoose).Promise = bluebird;
mongoose.connect(config.mongoUri);

const app = express();
app.use(cors());
app.set('port', config.port);
if (config.env == 'production') {
    app.use(morgan('combined'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', routes);

module.exports = app;
