const express = require('express');
const roomController = require('../controllers/roomController');
const authController = require('../controllers/authController');

const router = express.Router();

// 5) Aliasing
router
  .route('/cheapest-rooms')
  .get(roomController.aliasTopRooms, roomController.getAllRooms);

router.param('id', (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  next();
});

router
  .route('/')
  .get(authController.protect, roomController.getAllRooms)
  .post(roomController.createRoom);

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(roomController.updateRoom)
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    roomController.deleteRoom,
  );

module.exports = router;
