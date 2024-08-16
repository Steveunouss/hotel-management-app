const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const slugify = require('slugify');

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A car must have a name'],
      trim: true,
    },
    year: {
      type: Number,
      require: [true, 'A car must have a year'],
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'A car must have a price'],
    },
    desc: {
      type: String,
      required: [true, 'A car must have a description'],
    },
    imageCover: {
      type: String,
      required: [false, 'A car must have a cover image'],
    },
    img: {
      type: [String],
    },
    status: {
      type: String,
      enum: ['Available', 'Booked'],
      required: [true, 'A car must have a status'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

carSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

carSchema.index({ price: 1 });
carSchema.index({ slug: 1 });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
