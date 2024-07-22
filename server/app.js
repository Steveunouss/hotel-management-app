const express = require('express');
const morgan = require('morgan');

const roomRouter = require('./routes/roomRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

// 3) ROUTES

app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/users', userRouter);

// 4) START THE SERVER
module.exports = app;
