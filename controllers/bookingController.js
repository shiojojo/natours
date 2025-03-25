const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  // 2) In test environment, redirect directly to success URL
  const redirectUrl = `http://${req.get('host')}/?tour=${req.params.tourId}&user=${req.user.id}&price=${tour.price}`;

  if (req.xhr || req.headers.accept.includes('json')) {
    // If it's an AJAX request, send the URL
    res.status(200).json({ status: 'success', url: redirectUrl });
  } else {
    // Otherwise redirect directly
    res.redirect(redirectUrl);
  }
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  // This is temporary, because it's unsecure: anyone can make bookings without paying
  const { tour, user, price } = req.query;
  console.log('Query:', req.query);
  if (!tour && !user && !price) return next();

  await Booking.create({ tour, user, price });

  // Redirect to home page without query string
  res.redirect('/');
});

exports.getAllBookings = factory.getAll(Booking);
exports.getBooking = factory.getOne(Booking);
exports.createBooking = factory.createOne(Booking);
exports.updateBooking = factory.updateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);
