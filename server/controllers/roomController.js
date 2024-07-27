const Room = require('../models/roomModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopRooms = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name,price';
  next();
};

exports.getAllRooms = async (req, res) => {
  try {
    // EXECUTE THE QUERY
    const features = new APIFeatures(Room.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const rooms = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: rooms.length,
      data: {
        rooms: rooms,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid request.',
    });
  }
};

exports.getRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    // Room.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        room,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'Fail',
      message: err,
    });
  }
};

exports.createRoom = async (req, res) => {
  try {
    const newRoom = await Room.create(req.body).then();

    res.status(201).json({
      status: 'success',
      data: {
        room: newRoom,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateRoom = async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        room,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.deleteRoom = async (req, res) => {
  try {
    await Room.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};
