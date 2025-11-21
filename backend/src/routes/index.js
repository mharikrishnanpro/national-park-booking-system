import { Router } from "express";
import ticketRoutes from "./ticketRoutes.js";
import safariRoutes from "./safariRoutes.js";
import bookingRoutes from "./bookingRoutes.js";
import paymentRoutes from "./paymentRoutes.js";

const router = Router();

// Ticket routes
router.use("/tickets", ticketRoutes);

// Safari timing routes
router.use("/safari-timings", safariRoutes);

// Booking routes
router.use("/bookings", bookingRoutes);

// Payment routes
router.use("/payments", paymentRoutes);

export default router;
