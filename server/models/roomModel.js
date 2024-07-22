const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A room must have a name'],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, 'A room must have a price'],
  },
  desc: {
    type: String,
    required: [true, 'A room must have a description'],
  },
  img: {
    type: [String],
  },
  roomNumbers: {
    type: [
      {
        number: Number,
        unavailableDates: [Date],
      },
    ],
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
