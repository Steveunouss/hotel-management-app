const express = require('express');
const viewsController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');
const roomController = require('../controllers/roomController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewsController.getOverview,
);

router.get('/', authController.isLoggedIn, viewsController.getOverview);
router.get('/cars', authController.isLoggedIn, viewsController.getCarOverview);

router.get('/room/:slug', authController.isLoggedIn, viewsController.getRoom);
router.get('/car/:slug', authController.isLoggedIn, viewsController.getCar);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get('/me', authController.protect, viewsController.getAccount);

router.get('/my-rooms', authController.protect, viewsController.getMyRooms);
router.get('/my-cars', authController.protect, viewsController.getMyCars);

router.get('/bookings', authController.protect, viewsController.getBookings);
router.get(
  '/bookings-car',
  authController.protect,
  viewsController.getBookingsCar,
);

router.get(
  '/update-room',
  authController.protect,
  authController.restrictTo('admin'),
  roomController.updateRoom,
);

router.post(
  '/submit-user-data',
  authController.protect,
  viewsController.updateUserData,
);

module.exports = router;
