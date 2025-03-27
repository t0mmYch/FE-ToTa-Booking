import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import GuestBookingPage from "./pages/GuestBookingPage";
import GuestBookingDetailsPage from "./pages/GuestBookingDetailsPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import GlobalStyles from "./styles/GlobalStyles";

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a;
`;

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/guest-booking" element={<GuestBookingPage />} />
        <Route
          path="/guest-booking-details"
          element={<GuestBookingDetailsPage />}
        />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
        <Route path="/signup" element={<div>Sign Up Page (Coming Soon)</div>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AppContainer>
        <Navbar />
        <AnimatedRoutes />
      </AppContainer>
    </Router>
  );
}

export default App;
