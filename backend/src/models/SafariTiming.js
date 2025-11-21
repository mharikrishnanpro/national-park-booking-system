import mongoose from "mongoose";

const safariTimingSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
      trim: true,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SafariTiming", safariTimingSchema);
