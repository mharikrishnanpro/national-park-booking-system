import { Router } from "express";
import { getTickets, createTicket } from "../controllers/ticketController.js";

const router = Router();

// Get all tickets
router.get("/", getTickets);

// Create a new ticket (admin)
router.post("/", createTicket);

export default router;
