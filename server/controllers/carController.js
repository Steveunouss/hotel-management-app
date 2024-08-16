const Car = require('../models/carModel');
const factory = require('./handlerFactory');

exports.aliasTopCars = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price';
  req.query.fields = 'name,price';
  next();
};

exports.getAllCars = factory.getAllCars(Car);
exports.getCar = factory.getOne(Car);
exports.createCar = factory.createOne(Car);
exports.updateCar = factory.updateOne(Car);
exports.deleteCar = factory.deleteOne(Car);
