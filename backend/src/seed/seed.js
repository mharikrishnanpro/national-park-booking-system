import "dotenv/config";
import mongoose from "mongoose";
import Ticket from "../models/Ticket.js";
import SafariTiming from "../models/SafariTiming.js";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected for seeding");
  } catch (error) {
    console.error(`Connection Error: ${error.message}`);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await Ticket.deleteMany();
    await SafariTiming.deleteMany();

    // Seed tickets
    const tickets = [
      {
        name: "Zoo Entry",
        type: "zoo",
        price: 500,
        description:
          "Full day access to the national park zoo with all exhibits",
      },
      {
        name: "Safari Ride",
        type: "safari",
        price: 1500,
        description:
          "Guided safari ride through the wildlife reserve (2 hours)",
      },
      {
        name: "Combo Ticket",
        type: "combo",
        price: 1800,
        description: "Zoo entry + Safari ride combo package",
      },
    ];

    await Ticket.insertMany(tickets);
    console.log("Tickets seeded successfully");

    // Seed safari timings
    const timings = [
      { time: "10:00 AM", availableSeats: 50 },
      { time: "12:00 PM", availableSeats: 50 },
      { time: "2:00 PM", availableSeats: 50 },
      { time: "4:00 PM", availableSeats: 50 },
    ];

    await SafariTiming.insertMany(timings);
    console.log("Safari timings seeded successfully");

    console.log("All data seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

connectDB().then(seedData);
