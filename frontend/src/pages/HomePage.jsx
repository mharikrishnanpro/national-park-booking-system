import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { getTickets, getSafariTimings } from "../services/api";
import { showError } from "../utils/toast";
import Button from "../components/Button";
import Card from "../components/Card";
import Loader from "../components/Loader";
import { Icons } from "../constants/icons";

const HomePage = () => {
  const navigate = useNavigate();

  const {
    tickets,
    setTickets,
    safariTimings,
    setSafariTimings,
    loading,
    setLoading,
  } = useBooking();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [ticketRes, timingRes] = await Promise.all([
        getTickets(),
        getSafariTimings(),
      ]);

      setTickets(ticketRes.data.data || []);
      setSafariTimings(timingRes.data.data || []);
    } catch (err) {
      showError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader message="Loading..." />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-3">
          <Icons.PawPrint className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold">National Park Booking</h1>
        <p className="text-gray-600 mt-2">
          Choose tickets and safari timings for your adventure
        </p>
      </div>

      {/* Tickets List */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Available Tickets</h2>

        {tickets.length === 0 ? (
          <p className="text-gray-500">No tickets available</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {tickets.map((t) => (
              <Card key={t._id} className="hover:scale-105 transition-all">
                <h3 className="font-semibold text-lg mb-1">{t.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{t.description}</p>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-green-600">₹{t.price}</span>
                  <span className="text-xs bg-blue-200 text-blue-700 px-2 py-1 rounded">
                    {t.type}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Safari Timings */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Safari Timings</h2>

        {safariTimings.length === 0 ? (
          <p className="text-gray-500">No timings available</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {safariTimings.map((st) => (
              <Card
                key={st._id}
                className="text-center py-6 flex flex-col items-center hover:scale-105 transition-all"
              >
                <Icons.Clock className="w-5 h-5 text-green-600 mb-1" />
                <p className="font-semibold">{st.time}</p>
                <p className="text-sm text-gray-600">
                  {st.availableSeats} seats
                </p>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-10">
        <Button onClick={() => navigate("/booking")}>
          Start Booking
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
