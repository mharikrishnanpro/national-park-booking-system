import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../components/Loader";
import Layout from "../layout/Layout";

// Lazy load pages
const HomePage = lazy(() => import("../pages/HomePage"));
const BookingPage = lazy(() => import("../pages/BookingPage"));
const SummaryPage = lazy(() => import("../pages/SummaryPage"));
const PaymentPage = lazy(() => import("../pages/PaymentPage"));
const ConfirmationPage = lazy(() => import("../pages/ConfirmationPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader message="Loading..." />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/summary" element={<SummaryPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
