import { createContext, useState, useContext } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const [bookingData, setBookingData] = useState({
    ticketType: "",
    quantity: 1,
    safariTime: "",
    totalPrice: 0,
  });

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [paymentStatus, setPaymentStatus] = useState({
    status: null,
    paymentId: null,
    bookingId: null,
  });

  const [tickets, setTickets] = useState([]);
  const [safariTimings, setSafariTimings] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateBookingData = (data) =>
    setBookingData((prev) => ({ ...prev, ...data }));

  const updateUserInfo = (data) =>
    setUserInfo((prev) => ({ ...prev, ...data }));

  const updatePaymentStatus = (data) =>
    setPaymentStatus((prev) => ({ ...prev, ...data }));

  const resetBooking = () => {
    setBookingData({
      ticketType: "",
      quantity: 1,
      safariTime: "",
      totalPrice: 0,
    });
    setUserInfo({
      name: "",
      email: "",
      phone: "",
    });
    setPaymentStatus({
      status: null,
      paymentId: null,
      bookingId: null,
    });
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        updateBookingData,
        userInfo,
        updateUserInfo,
        paymentStatus,
        updatePaymentStatus,
        tickets,
        setTickets,
        safariTimings,
        setSafariTimings,
        loading,
        setLoading,
        resetBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
