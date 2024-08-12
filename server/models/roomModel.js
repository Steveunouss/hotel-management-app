const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const slugify = require('slugify');

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A room must have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A room must have a price'],
    },
    desc: {
      type: String,
      required: [true, 'A room must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A room must have a cover image'],
    },
    img: {
      type: [String],
    },
    status: {
      type: String,
      enum: ['Available', 'Booked'],
      required: [true, 'A room must have a status'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual populate
roomSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'room',
  localField: '_id',
});

roomSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

roomSchema.index({ price: 1 });
roomSchema.index({ slug: 1 });

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
