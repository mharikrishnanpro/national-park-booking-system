import { Router } from "express";
import {
  getSafariTimings,
  createSafariTiming,
} from "../controllers/safariController.js";

const router = Router();

// Get all safari timings
router.get("/", getSafariTimings);

// Create a safari timing (admin)
router.post("/", createSafariTiming);

export default router;
