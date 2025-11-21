import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { getTickets, getSafariTimings } from "../services/api";
import { showError } from "../utils/toast";
import Card from "../components/Card";
import Button from "../components/Button";
import { Icons } from "../constants/icons";

const BookingPage = () => {
  const navigate = useNavigate();

  const {
    bookingData,
    updateBookingData,
    tickets,
    setTickets,
    safariTimings,
    setSafariTimings,
  } = useBooking();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tRes, sRes] = await Promise.all([getTickets(), getSafariTimings()]);
      setTickets(tRes.data.data || []);
      setSafariTimings(sRes.data.data || []);
    } catch {
      showError("Failed to load data");
    }
  };

  const handleSelectTicket = (ticket) => {
    updateBookingData({
      ticketType: ticket.name,
      totalPrice: ticket.price * bookingData.quantity,
    });
  };

  const handleQuantityChange = (qty) => {
    const ticket = tickets.find((t) => t.name === bookingData.ticketType);
    updateBookingData({
      quantity: qty,
      totalPrice: ticket ? ticket.price * qty : 0,
    });
  };

  const handleProceed = () => {
    if (!bookingData.ticketType) return showError("Select a ticket type");
    if (!bookingData.safariTime) return showError("Select safari time");
    navigate("/summary");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Icons.ChevronLeft
          className="cursor-pointer w-6 h-6"
          onClick={() => navigate("/")}
        />
        <h1 className="text-2xl font-bold">Book Your Tickets</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Selection */}
        <div className="md:col-span-2 space-y-6">

          {/* Select Ticket */}
          <Card>
            <h2 className="font-semibold mb-3">Select Ticket Type</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {tickets.map((t) => (
                <button
                  key={t._id}
                  onClick={() => handleSelectTicket(t)}
                  className={`border rounded-lg p-4 text-left transition ${bookingData.ticketType === t.name
                    ? "border-green-600 bg-green-100"
                    : "border-gray-300 hover:border-green-500"
                    }`}
                >
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-600">{t.description}</p>
                  <p className="text-green-600 font-bold mt-2">₹{t.price}</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Select Quantity */}
          <Card>
            <h2 className="font-semibold mb-3">Select Quantity</h2>
            <select
              value={bookingData.quantity}
              onChange={(e) => handleQuantityChange(Number(e.target.value))}
              className="border px-3 py-2 rounded-lg w-32"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </Card>

          {/* Safari Timing */}
          <Card>
            <h2 className="font-semibold mb-3">Select Safari Time</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {safariTimings.map((t) => (
                <button
                  key={t._id}
                  onClick={() => updateBookingData({ safariTime: t.time })}
                  className={`border rounded-lg p-3 text-center transition ${bookingData.safariTime === t.time
                    ? "border-green-600 bg-green-100"
                    : "border-gray-300 hover:border-green-500"
                    }`}
                >
                  <p className="font-semibold">{t.time}</p>
                  <p className="text-xs text-gray-600">{t.availableSeats} seats</p>
                </button>
              ))}
            </div>
          </Card>

          <div className="text-center mt-4">
            <Button onClick={handleProceed}>
              Continue
            </Button>
          </div>
        </div>

        {/* Right: Summary */}
        <Card>
          <h2 className="font-semibold mb-4">Summary</h2>

          <div className="space-y-2 text-sm mb-4">
            <div>
              <p className="text-gray-600">Ticket Type</p>
              <p className="font-semibold">
                {bookingData.ticketType || "Not selected"}
              </p>
            </div>

            <div>
              <p className="text-gray-600">Quantity</p>
              <p className="font-semibold">{bookingData.quantity}</p>
            </div>

            <div>
              <p className="text-gray-600">Safari Time</p>
              <p className="font-semibold">
                {bookingData.safariTime || "Not selected"}
              </p>
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-gray-600 text-sm">Total Price</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{bookingData.totalPrice}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default BookingPage;
