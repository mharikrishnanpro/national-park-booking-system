import asyncHandler from 'express-async-handler';
import Booking from '../models/Booking.js';

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Public
export const createBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.create(req.body);

  res.status(201).json({
    success: true,
    data: booking,
  });
});

// @desc    Get booking by ID
// @route   GET /api/bookings/:id
// @access  Public
export const getBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.params.id).lean();

  if (!booking) {
    res.status(404);
    throw new Error('Booking not found');
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Public
export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find().lean();

  res.status(200).json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
});
