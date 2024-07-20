const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARES
app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().getFullYear();
  next();
});

const rooms = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/rooms.json`)
);

// 2) ROUTE HANDLERS
const getAllRooms = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: rooms.length,
    data: {
      rooms: rooms,
    },
  });
};

const getRoom = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const room = rooms.find((el) => el.id === id);

  if (!room) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      room,
    },
  });
};

const createRoom = (req, res) => {
  const newId = rooms[rooms.length - 1].id + 1;
  const newRoom = Object.assign({ id: newId }, req.body);

  rooms.push(newRoom);
  fs.writeFile(
    `${__dirname}/dev-data/data/rooms.json`,
    JSON.stringify(rooms),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          room: newRoom,
        },
      });
    }
  );
};

const updateRoom = (req, res) => {
  if (req.params.id * 1 > rooms.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      room: '<Updated room>',
    },
  });
};
const deleteRoom = (req, res) => {
  if (req.params.id * 1 > rooms.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet.',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet.',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet.',
  });
};

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet.',
  });
};

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined yet.',
  });
};
// app.get('/api/v1/rooms', getAllTours);
// app.get('/api/v1/rooms/:id', getTour);
// app.post('/api/v1/rooms', createTour);
// app.patch('/api/v1/rooms/:id', updateTour);
// app.delete('/api/v1/rooms/:id', deleteTour);

// 3) ROUTES
const roomRouter = express.Router();
const userRouter = express.Router();

roomRouter.route('/').get(getAllRooms).post(createRoom);

roomRouter.route('/:id').get(getRoom).patch(updateRoom).delete(deleteRoom);

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/rooms', roomRouter);
app.use('/api/v1/users', userRouter);

// 4) START THE SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
