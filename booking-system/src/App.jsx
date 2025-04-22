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
import SignUpPage from "./pages/SignUpPage";
import GuestBookingPage from "./pages/GuestBookingPage";
import GuestBookingDetailsPage from "./pages/GuestBookingDetailsPage";
import UserBookingPage from "./pages/UserBookingPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import GlobalStyles from "./styles/GlobalStyles";
import LoginUserBookingPage from "./pages/LoginUserBookingPage";

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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/guest-booking" element={<GuestBookingPage />} />
        <Route path="/login-user-booiking" element={<LoginUserBookingPage />} />
        <Route path="/guest-booking-details" element={<GuestBookingDetailsPage />} />
        <Route path="/user-booking" element={<UserBookingPage />} />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
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
