import * as express from 'express';
import * as helloController from './controllers/hello';

const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', helloController.hello);

module.exports = app;
