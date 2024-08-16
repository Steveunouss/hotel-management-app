const express = require('express');
const bookingCarController = require('../controllers/bookingCarController');
const authController = require('../controllers/authController');

// By default, each router only has access to the parameters of their specific routes
const router = express.Router();

router.route('/cars').get(bookingCarController.getAllBookingsCar);

router.get(
  '/checkout-session/:carId',
  authController.protect,
  bookingCarController.getCheckoutSessionCar,
);
module.exports = router;
