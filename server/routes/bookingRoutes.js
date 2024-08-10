const express = require('express');
const bookingController = require('../controllers/bookingController');
const authController = require('../controllers/authController');

// By default, each router only has access to the parameters of their specific routes
const router = express.Router();

router.get(
  '/checkout-session/:roomId',
  authController.protect,
  bookingController.getCheckoutSession,
);
module.exports = router;
