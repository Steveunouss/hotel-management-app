const Room = require('../models/roomModel');
const factory = require('./handlerFactory');

exports.aliasTopRooms = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name,price';
  next();
};

exports.getAllRooms = factory.getAll(Room);
exports.getRoom = factory.getOne(Room, { path: 'reviews' });
exports.createRoom = factory.createOne(Room);
exports.updateRoom = factory.updateOne(Room);
exports.deleteRoom = factory.deleteOne(Room);
