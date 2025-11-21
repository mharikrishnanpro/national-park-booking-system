import asyncHandler from 'express-async-handler';
import SafariTiming from '../models/SafariTiming.js';

// @desc    Get all safari timings
// @route   GET /api/safari-timings
// @access  Public
export const getSafariTimings = asyncHandler(async (req, res) => {
  const timings = await SafariTiming.find().lean();

  res.status(200).json({
    success: true,
    count: timings.length,
    data: timings,
  });
});

// @desc    Create safari timing
// @route   POST /api/safari-timings
// @access  Private (Admin)
export const createSafariTiming = asyncHandler(async (req, res) => {
  const timing = await SafariTiming.create(req.body);

  res.status(201).json({
    success: true,
    data: timing,
  });
});
