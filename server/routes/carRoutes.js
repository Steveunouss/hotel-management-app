const express = require('express');
const carController = require('../controllers/carController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:carId/reviews', reviewRouter);

// 5) Aliasing
router
  .route('/cheapest-cars')
  .get(carController.aliasTopCars, carController.getAllCars);

router.param('id', (req, res, next, val) => {
  console.log(`Car id is ${val}`);
  next();
});

router
  .route('/')
  .get(carController.getAllCars)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    carController.createCar,
  );

router
  .route('/:id')
  .get(carController.getCar)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    carController.updateCar,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    carController.deleteCar,
  );

module.exports = router;
