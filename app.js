const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const debug = require('debug')('codeinterview:server');
const http = require('http');
const config = require('config');
const cors = require('cors');

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1);
}
// 'mongodb://localhost/CodeInterview'

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Admin:qweasd123@cluster0-yzodb.mongodb.net/CodeInterview?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => {
        console.log('Successfully connected to Mongo database');
    })
    .catch( err => { console.log('Error: ', err.data); });

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || '3000';
app.set('port', port);

server.listen(port, () => {
    console.log('Server is listening to port', port);
  });

server.on('error', onError);
server.on('listening', onListening);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const tasksRouter = require('./routes/task.js');
const judgeRouter = require('./routes/judge.js');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);
app.use('/judge', judgeRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

let io = require('socket.io')(server);
const room = require('./socket/room_namespace.js');
room.createNameSpace(io);	


module.exports = app;

