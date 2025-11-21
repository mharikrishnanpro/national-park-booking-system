import asyncHandler from 'express-async-handler';
import Ticket from '../models/Ticket.js';

// @desc    Get all tickets
// @route   GET /api/tickets
// @access  Public
export const getTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find().lean();

  res.status(200).json({
    success: true,
    count: tickets.length,
    data: tickets,
  });
});

// @desc    Create a ticket
// @route   POST /api/tickets
// @access  Private (Admin)
export const createTicket = asyncHandler(async (req, res) => {
  const ticket = await Ticket.create(req.body);

  res.status(201).json({
    success: true,
    data: ticket,
  });
});
