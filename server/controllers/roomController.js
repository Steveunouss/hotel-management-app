const fs = require('fs');

const rooms = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/rooms.json`)
);

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > rooms.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.type || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllRooms = (req, res) => {
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

exports.getRoom = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const room = rooms.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      room,
    },
  });
};

exports.createRoom = (req, res) => {
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

exports.updateRoom = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      room: '<Updated room>',
    },
  });
};

exports.deleteRoom = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
