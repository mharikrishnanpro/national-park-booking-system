import { Router } from "express";
import {
  createBooking,
  getBooking,
  getAllBookings,
} from "../controllers/bookingController.js";

const router = Router();

// GET all bookings
router.get("/", getAllBookings);

// GET single booking by ID
router.get("/:id", getBooking);

// CREATE booking
router.post("/", createBooking);

export default router;
