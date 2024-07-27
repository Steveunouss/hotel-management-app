const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A room must have a name'],
    unique: true,
    trim: true,
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
  status: {
    type: String,
    required: [true, 'A room must have a status'],
  },
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
