const Car = require('../models/carModel');
const Room = require('../models/roomModel');
const Booking = require('../models/bookingModel');
const BookingCar = require('../models/bookingCarModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

exports.getOverview = catchAsync(async (req, res, next) => {
  // 1) Get room data from the collection
  const rooms = await Room.find();

  //2) Build template

  // 3) Render that template using room data from 1)
  res.status(200).render('overview', {
    title: 'All rooms',
    rooms,
  });
});

exports.getRoom = catchAsync(async (req, res, next) => {
  // get data for the requested room (including reviews)
  const room = await Room.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'reviews rating user',
  });
  // build template
  // render template using data from 1)

  if (!room) {
    return next(new AppError('There is no room with that name', 404));
  }

  res.status(200).render('room', {
    title: 'placeholder',
    room,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getSignupForm = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Create New Account',
  });
});

exports.getMyRooms = catchAsync(async (req, res, next) => {
  // find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  // find rooms with returned IDs
  const roomIds = bookings.map((el) => el.room);
  const rooms = await Room.find({ _id: { $in: roomIds } });

  res.status(200).render('overview', {
    title: 'My rooms',
    rooms,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.getCarOverview = catchAsync(async (req, res, next) => {
  // 1) Get car data from the collection
  const cars = await Car.find();

  //2) Build template

  // 3) Render that template using car data from 1)
  res.status(200).render('carOverview', {
    title: 'All cars',
    cars,
  });
});

exports.getCar = catchAsync(async (req, res, next) => {
  const car = await Car.findOne({ slug: req.params.slug });
  // build template
  // render template using data from 1)

  if (!car) {
    return next(new AppError('There is no car with that name', 404));
  }

  res.status(200).render('car', {
    title: 'placeholder',
    car,
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

exports.getSignupForm = catchAsync(async (req, res, next) => {
  res.status(200).render('signup', {
    title: 'Create New Account',
  });
});

exports.getMyCars = catchAsync(async (req, res, next) => {
  // find all bookings
  const bookings = await BookingCar.find({ user: req.user.id });

  // find cars with returned IDs
  const carIds = bookings.map((el) => el.car);
  const cars = await Car.find({ _id: { $in: carIds } });

  res.status(200).render('carOverview', {
    title: 'My cars',
    cars,
  });
});

exports.updateRoomData = catchAsync(async (req, res, next) => {
  const updateRoom = await Room.findByIdAndUpdate(
    req.room.id,
    {
      name: req.body.name,
      price: req.body.price,
      desc: req.body.desc,
      status: req.body.status,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).render('updateRoom', {
    title: 'Your account',
    user: updateRoom,
  });
});

exports.getBookings = catchAsync(async (req, res, next) => {
  // 1) Get room data from the collection
  const bookings = await Booking.find();

  // find rooms with returned IDs
  const roomIds = bookings.map((el) => el.room);
  const rooms = await Room.find({ _id: { $in: roomIds } });

  //2) Build template

  // 3) Render that template using room data from 1)
  res.status(200).render('list', {
    title: 'All bookings',
    rooms,
  });
});

exports.getBookingsCar = catchAsync(async (req, res, next) => {
  // 1) Get car data from the collection
  const bookingsCar = await BookingCar.find();

  // find car with returned IDs
  const carIds = bookingsCar.map((el) => el.car);
  const cars = await Car.find({ _id: { $in: carIds } });

  // 3) Render that template using room data from 1)
  res.status(200).render('list', {
    title: 'All car bookings',
    cars,
  });
});
