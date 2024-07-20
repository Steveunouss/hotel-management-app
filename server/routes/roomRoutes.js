const express = require('express');
const roomController = require('./../controllers/roomController');

const router = express.Router();

router.param('id', roomController.checkID);

// TODO: Create a checkBody middleware function
// TODO: Check if body contains the type and price properties
// If not, send back 400 (Bad request)
// Add it to the post handler stack

router.param('id', (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  next();
});

router
  .route('/')
  .get(roomController.getAllRooms)
  .post(roomController.checkBody, roomController.createRoom);

router
  .route('/:id')
  .get(roomController.getRoom)
  .patch(roomController.updateRoom)
  .delete(roomController.deleteRoom);

module.exports = router;
