import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Tickets
export const getTickets = () => api.get("/tickets");
export const createTicket = (data) => api.post("/tickets", data);

// Safari Timings
export const getSafariTimings = () => api.get("/safari-timings");
export const createSafariTiming = (data) => api.post("/safari-timings", data);

// Bookings
export const getAllBookings = () => api.get("/bookings");
export const getBooking = (id) => api.get(`/bookings/${id}`);
export const createBooking = (data) => api.post("/bookings", data);

// Payments
export const initiatePayment = (data) => api.post("/payments/initiate", data);
export const verifyPayment = (data) => api.post("/payments/verify", data);

export default api;
