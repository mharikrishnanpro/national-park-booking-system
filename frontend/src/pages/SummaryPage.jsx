import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import Card from "../components/Card";
import Button from "../components/Button";
import { showError } from "../utils/toast";
import { Icons } from "../constants/icons";
import Input from "../components/Input";
import { isValidEmail, isValidPhone, isValidName } from "../utils/validators";

const SummaryPage = () => {
  const navigate = useNavigate();
  const { bookingData, userInfo, updateUserInfo } = useBooking();

  const onChange = (e) => {
    updateUserInfo({ [e.target.name]: e.target.value });
  };

  const handleContinue = () => {
    if (!isValidName(userInfo.name)) {
      return showError("Enter a valid name");
    }

    if (!isValidEmail(userInfo.email)) {
      return showError("Enter a valid email");
    }

    if (!isValidPhone(userInfo.phone)) {
      return showError("Enter a valid 10-digit phone number");
    }

    navigate("/payment");
  };


  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Icons.ChevronLeft
          className="cursor-pointer w-6 h-6"
          onClick={() => navigate("/booking")}
        />
        <h1 className="text-2xl font-bold">Booking Summary</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left: Details + User Info */}
        <div className="md:col-span-2 space-y-6">

          {/* Booking Details */}
          <Card>
            <h2 className="font-semibold mb-4">Your Booking</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p className="text-gray-600">Ticket</p>
                <p className="font-semibold">{bookingData.ticketType}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Quantity</p>
                <p className="font-semibold">{bookingData.quantity}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Safari Time</p>
                <p className="font-semibold">{bookingData.safariTime}</p>
              </div>

              <div className="flex justify-between border-t pt-2">
                <p className="text-gray-600 font-semibold">Total Amount</p>
                <p className="text-2xl font-bold text-green-600">
                  ₹{bookingData.totalPrice}
                </p>
              </div>
            </div>
          </Card>

          {/* User Info */}
          <Card>
            <h2 className="font-semibold mb-4">Your Information</h2>

            <div className="space-y-4 text-sm">
              <Input
                label="Name"
                name="name"
                placeholder="Enter your name"
                value={userInfo.name}
                onChange={onChange}
              />

              <Input
                label="Email"
                name="email"
                placeholder="Enter your email"
                value={userInfo.email}
                onChange={onChange}
              />

              <Input
                label="Phone Number"
                name="phone"
                placeholder="Enter your phone number"
                value={userInfo.phone}
                onChange={onChange}
              />
            </div>
          </Card>

          {/* Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              bgColor="bg-gray-600 hover:bg-gray-700"
              onClick={() => navigate("/booking")}
            >
              Back
            </Button>

            <Button onClick={handleContinue}>
              Continue to Payment
            </Button>
          </div>
        </div>

        {/* Right: Summary Card */}
        <Card>
          <h2 className="font-semibold mb-4">Summary</h2>

          <div className="space-y-2 text-sm mb-6 pb-4 border-b">
            <div>
              <p className="text-gray-600">Ticket</p>
              <p className="font-semibold">{bookingData.ticketType}</p>
            </div>

            <div>
              <p className="text-gray-600">Quantity</p>
              <p className="font-semibold">{bookingData.quantity}</p>
            </div>

            <div>
              <p className="text-gray-600">Safari Time</p>
              <p className="font-semibold">{bookingData.safariTime}</p>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{bookingData.totalPrice}
            </p>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default SummaryPage;
