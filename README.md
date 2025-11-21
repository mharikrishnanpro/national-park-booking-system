# National Park Booking System

A full-stack MERN application for booking national park tickets and safari rides with a multi-step checkout flow and dummy payment processing.

## Tech Stack

**Frontend:**
- React 19 + Vite
- Tailwind CSS
- React Router
- Axios

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- CORS, dotenv

## Project Structure

```
national-park-booking-system/
├── backend/
│   ├── src/
│   │   ├── models/          (Ticket, SafariTiming, Booking)
│   │   ├── controllers/     (API logic)
│   │   ├── routes/          (API endpoints)
│   │   ├── middleware/      (Error handling)
│   │   ├── config/          (Database)
│   │   ├── seed/            (Seed data)
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── pages/           (5-step booking flow)
    │   ├── components/      (UI components)
    │   ├── constants/       (Icons, constants)
    │   ├── layout/          (Root layout)
    │   ├── routes/          (Routing config)
    │   ├── utils/           (Validators, toast)
    │   ├── context/         (Global state / BookingContext)
    │   ├── services/        (API calls)
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── .env

```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
MONGO_URI=mongodb://localhost:27017/national-park-booking
PORT=5000
```

4. Seed the database:
```bash
npm run seed
```

5. Start the server:
```bash
npm run dev
```

Server runs on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
VITE_API_BASE_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Features

- Multi-step booking workflow (Home → Booking → Summary → Payment → Confirmation)
- Real-time price calculation
- Form validation
- Loading states and error handling
- Responsive design
- Global state management with Context API
- Booking confirmation with unique ID

## API Endpoints

**Tickets:**
- `GET /api/tickets` - Get all tickets
- `POST /api/tickets` - Create ticket

**Safari Timings:**
- `GET /api/safari-timings` - Get all timings
- `POST /api/safari-timings` - Create timing

**Bookings:**
- `POST /api/bookings` - Create booking
- `GET /api/bookings` - Get all bookings
- `GET /api/bookings/:id` - Get booking by ID

**Payments:**
- `POST /api/payments/initiate` - Create payment
- `POST /api/payments/verify` - Verify payment

## Payment Gateway

The application includes a dummy payment gateway that simulates a 2-3 second payment processing delay. No real payments are processed.

## Database Seeding

Seed data includes:
- 3 ticket types: Zoo Entry (₹500), Safari Ride (₹1500), Combo (₹1800)
- 4 safari timings: 10 AM, 12 PM, 2 PM, 4 PM (50 seats each)

Run seeding with:
```bash
npm run seed
```

## Running Both Servers

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Author

Created as a MERN stack assignment project.
