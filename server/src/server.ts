import config from './config/config';

console.log(`Starting app in ${config.env} mode`);

const app = require('./app');

app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});