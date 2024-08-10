const express = require('express');
const roomController = require('../controllers/roomController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:roomId/reviews', reviewRouter);

// 5) Aliasing
router
  .route('/cheapest-rooms')
  .get(roomController.aliasTopRooms, roomController.getAllRooms);

router.param('id', (req, res, next, val) => {
  console.log(`Room id is ${val}`);
  next();
});

router
  .route('/')
  .get(roomController.getAllRooms)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    roomController.createRoom,
  );

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    roomController.updateRoom,
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    roomController.deleteRoom,
  );

module.exports = router;
