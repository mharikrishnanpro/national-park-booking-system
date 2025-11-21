import asyncHandler from 'express-async-handler';

// @desc    Initiate payment
// @route   POST /api/payments/initiate
// @access  Public
export const initiatePayment = asyncHandler(async (req, res) => {
  const { amount, bookingId } = req.body;

  if (!amount || !bookingId) {
    res.status(400);
    throw new Error('Amount and bookingId are required');
  }

  // Generate a dummy payment ID
  const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  res.status(200).json({
    success: true,
    data: {
      paymentId,
      status: 'pending',
      amount,
      bookingId,
    },
  });
});

// @desc    Verify payment
// @route   POST /api/payments/verify
// @access  Public
export const verifyPayment = asyncHandler(async (req, res) => {
  const { paymentId, bookingId } = req.body;

  if (!paymentId || !bookingId) {
    res.status(400);
    throw new Error('paymentId and bookingId are required');
  }

  // Simulate 2–3 second delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  res.status(200).json({
    success: true,
    data: {
      paymentId,
      status: 'success',
      bookingId,
      message: 'Payment verified successfully',
    },
  });
});
