import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBooking } from "../context/BookingContext";
import { createBooking, initiatePayment, verifyPayment } from "../services/api";
import Card from "../components/Card";
import Button from "../components/Button";
import { showError, showSuccess } from "../utils/toast";
import { Icons } from "../constants/icons";

const PaymentPage = () => {
  const navigate = useNavigate();
  const { bookingData, userInfo, updatePaymentStatus, loading, setLoading } = useBooking();

  const [method, setMethod] = useState("upi");

  const handlePayment = async () => {
    if (!method) return showError("Select a payment method");

    setLoading(true);

    try {
      // 1. Create booking
      const bookingRes = await createBooking({
        ticketType: bookingData.ticketType,
        quantity: bookingData.quantity,
        safariTime: bookingData.safariTime,
        amount: bookingData.totalPrice,
        user: userInfo,
        paymentStatus: "pending",
      });

      const bookingId = bookingRes.data.data._id;

      // 2. Initiate payment
      const initRes = await initiatePayment({
        amount: bookingData.totalPrice,
        bookingId,
      });

      const paymentId = initRes.data.data.paymentId;

      // 3. Verify payment
      await verifyPayment({ paymentId, bookingId });

      // 4. Save payment status
      updatePaymentStatus({
        status: "success",
        paymentId,
        bookingId,
      });

      showSuccess("Payment successful");
      navigate("/confirmation");
    } catch (err) {
      showError("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <Icons.ChevronLeft
          className="cursor-pointer w-6 h-6"
          onClick={() => navigate("/summary")}
        />
        <h1 className="text-2xl font-bold">Payment</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Payment Methods */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h2 className="font-semibold mb-4">Select Payment Method</h2>

            <div className="space-y-3">

              {/* Option */}
              {/* UPI */}
              <label
                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition 
                  ${method === "upi" ? "border-green-600 bg-green-100" : "hover:border-green-400"}`}
              >
                <input
                  type="radio"
                  checked={method === "upi"}
                  onChange={() => setMethod("upi")}
                />
                <div className="flex items-center gap-2">
                  <Icons.Smartphone className="w-10 h-10" />
                  <p>UPI</p>
                </div>
              </label>

              {/* Net Banking */}
              <label
                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition 
                  ${method === "netbanking" ? "border-green-600 bg-green-100" : "hover:border-green-400"}`}
              >
                <input
                  type="radio"
                  checked={method === "netbanking"}
                  onChange={() => setMethod("netbanking")}
                />
                <div className="flex items-center gap-2">
                  <Icons.Home className="w-10 h-10" />
                  <p>Net Banking</p>
                </div>
              </label>

              {/* Card */}
              <label
                className={`flex items-center gap-3 border rounded-lg p-3 cursor-pointer transition 
                  ${method === "card" ? "border-green-600 bg-green-100" : "hover:border-green-400"}`}
              >
                <input
                  type="radio"
                  checked={method === "card"}
                  onChange={() => setMethod("card")}
                />
                <div className="flex items-center gap-2">
                  <Icons.CreditCard className="w-10 h-10" />
                  <p>Card</p>
                </div>
              </label>

            </div>
          </Card>

          <div className="text-center">
            <Button onClick={handlePayment} disabled={loading}>
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </div>
        </div>

        {/* Summary */}
        <Card>
          <h2 className="font-semibold mb-4">Summary</h2>

          <div className="space-y-2 text-sm mb-4">
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

          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Total Amount</p>
            <p className="text-3xl font-bold text-green-600">
              ₹{bookingData.totalPrice}
            </p>
          </div>

          <div className="text-xs text-yellow-700 bg-yellow-50 p-3 rounded mt-3">
            Demo Payment — auto verification enabled
          </div>
        </Card>

      </div>
    </div>
  );
};

export default PaymentPage;
