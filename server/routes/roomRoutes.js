const express = require('express');
const roomController = require('../controllers/roomController');

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
  .get(roomController.getAllRooms)
  .post(roomController.createRoom);

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);

module.exports = router;
