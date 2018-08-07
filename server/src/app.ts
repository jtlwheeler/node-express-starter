import config from './config/config';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import routes from './routes/index.route';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';
import * as cors from 'cors';
import * as path from 'path';

require('./config/passport');

(<any>mongoose).Promise = bluebird;
connectDB();

const app = express();
app.use(cors());
app.set('port', config.port);
if (config.env == 'production') {
    app.use(morgan('combined'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', routes);
app.use(express.static(path.join(__dirname, 'assets')));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

module.exports = app;

let attempts = 0;

async function connectDB() {
    try {
        await mongoose.connect(config.mongoUri, {useNewUrlParser: true});
        console.log('Connected to Mongo');
        attempts = 0;
    }
    catch (reason) {
        attempts++;
        console.log(`Error connecting to database (${attempts} attempts): ${reason}`);
        setTimeout(connectDB, 3000);
    }
}