import { BrowserRouter as Router } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BookingProvider>
      <Router>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={2000} />
      </Router>
    </BookingProvider>
  );
};

export default App;
