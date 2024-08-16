// eslint-disable-next-line import/no-extraneous-dependencies
const stripe = require('stripe')([process.env.STRIPE_SECRET_KEY]);
const factory = require('./handlerFactory');
const Car = require('../models/carModel');
const BookingCar = require('../models/bookingCarModel');
const catchAsync = require('../utils/catchAsync');
// const factory = require('./handlerFactory');

exports.getAllBookingsCar = factory.getAllCars(BookingCar);

exports.getCheckoutSessionCar = catchAsync(async (req, res, next) => {
  // Get the currently booked car
  const car = await Car.findById(req.params.carId);
  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?car=${req.params.carId}&user=${req.user.id}&price=${car.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/car/${car.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.carId,
    line_items: [
      {
        name: `${car.name} car`,
        description: car.desc,
        images: [],
        amount: car.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });
  // Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCarCheckout = catchAsync(async (req, res, next) => {
  // this is only temporary because its insecure: everone can make bookingCar without paying
  const { car, user, price } = req.query;

  if (!car && !user && !price) return next();
  await BookingCar.create({ car, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});
