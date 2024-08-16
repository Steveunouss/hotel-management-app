const mongoose = require('mongoose');

const bookingCarSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.ObjectId,
    ref: 'Car',
    required: [true, 'Booking must belong to a Car!'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!'],
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a price.'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

bookingCarSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'car',
    select: 'name',
  });
  next();
});

const BookingCar = mongoose.model('BookingCar', bookingCarSchema);

module.exports = BookingCar;
