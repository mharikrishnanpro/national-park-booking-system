import { Router } from "express";
import {
  initiatePayment,
  verifyPayment,
} from "../controllers/paymentController.js";

const router = Router();

// Initiate payment
router.post("/initiate", initiatePayment);

// Verify payment
router.post("/verify", verifyPayment);

export default router;
