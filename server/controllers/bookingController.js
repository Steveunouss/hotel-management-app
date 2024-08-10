// eslint-disable-next-line import/no-extraneous-dependencies
const stripe = require('stripe')([process.env.STRIPE_SECRET_KEY]);
const Room = require('../models/roomModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
// const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // Get the currently booked room
  const room = await Room.findById(req.params.roomId);
  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?room=${req.params.roomId}&user=${req.user.id}&price=${room.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/room/${room.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.roomId,
    line_items: [
      {
        name: `${room.name} room`,
        description: room.desc,
        images: [],
        amount: room.price * 100,
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

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // this is only temporary because its insecure: everone can make booking without paying
  const { room, user, price } = req.query;

  if (!room && !user && !price) return next();
  await Booking.create({ room, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});
