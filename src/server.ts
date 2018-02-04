const app = require('./app');

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on port ${app.get('port')}`);
});