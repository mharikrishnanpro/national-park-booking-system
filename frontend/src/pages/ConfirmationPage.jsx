import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import Card from "../components/Card";
import Button from "../components/Button";
import { Icons } from "../constants/icons";

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const { bookingData, userInfo, paymentStatus, resetBooking } = useBooking();

  const handleNew = () => {
    resetBooking();
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Icons.CheckCircle className="text-green-600" />
          Booking Confirmed
        </h1>
      </div>

      {/* Success Card */}
      <Card className="text-center">
        <Icons.CheckCircle className="text-green-600 w-12 h-12 mx-auto mb-3" />
        <h2 className="text-xl font-semibold mb-1">Payment Successful</h2>
        <p className="text-gray-600">Your booking has been confirmed.</p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

        {/* Booking Details */}
        <Card>
          <h3 className="font-semibold mb-4">Booking Details</h3>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-600">Booking ID</span>
              <span className="font-semibold break-all">{paymentStatus.bookingId}</span>
            </p>

            <p className="flex justify-between">
              <span className="text-gray-600">Payment ID</span>
              <span className="font-semibold break-all">{paymentStatus.paymentId}</span>
            </p>

            <p className="flex justify-between">
              <span className="text-gray-600">Status</span>
              <span className="font-semibold text-green-600">
                {paymentStatus.status}
              </span>
            </p>
          </div>
        </Card>

        {/* Ticket Details */}
        <Card>
          <h3 className="font-semibold mb-4">Ticket Info</h3>
          <div className="space-y-2 text-sm">
            <p className="flex justify-between">
              <span className="text-gray-600">Ticket Type</span>
              <span className="font-semibold">{bookingData.ticketType}</span>
            </p>

            <p className="flex justify-between">
              <span className="text-gray-600">Quantity</span>
              <span className="font-semibold">{bookingData.quantity}</span>
            </p>

            <p className="flex justify-between">
              <span className="text-gray-600">Safari Time</span>
              <span className="font-semibold">{bookingData.safariTime}</span>
            </p>
          </div>
        </Card>

      </div>

      {/* User Info */}
      <Card className="mt-6">
        <h3 className="font-semibold mb-4">Passenger Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Name</p>
            <p className="font-semibold">{userInfo.name}</p>
          </div>
          <div>
            <p className="text-gray-600">Email</p>
            <p className="font-semibold">{userInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-600">Phone</p>
            <p className="font-semibold">{userInfo.phone}</p>
          </div>
        </div>
      </Card>

      {/* Total Amount */}
      <Card className="mt-6">
        <p className="text-sm text-gray-600">Total Amount Paid</p>
        <p className="text-3xl font-bold text-green-600">
          ₹{bookingData.totalPrice}
        </p>
      </Card>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <Button
          bgColor="bg-gray-600 hover:bg-gray-700"
          onClick={() => navigate("/")}
        >
          Back to Home
        </Button>

        <Button onClick={handleNew}>
          Make Another Booking
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
