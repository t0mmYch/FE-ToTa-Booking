import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageTransition from "../components/PageTransition";

const LandingPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleGuestBooking = (e) => {
    e.preventDefault();
    try {
      navigate("/guest-booking");
    } catch (err) {
      setError("Unable to proceed. Please try again.");
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };


  const handleSignUpClick = () => {
    navigate('/signup');
  };

  const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    min-height: 100vh;
    background-color: #1a1a1a;
    color: white;
  `;

  const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 300px;
    margin-top: 15vh;
  `;

  const Button = styled(Link)`
    padding: 1rem 2rem;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    width: 100%;

    &.primary {
      background-color: #4caf50;
      color: white;
      border: none;

      &:hover {
        background-color: #45a049;
        transform: translateY(-2px);
      }
    }

    &.secondary {
      background-color: white;
      color: #333;
      border: 2px solid transparent;

      &:hover {
        background-color: #f5f5f5;
        transform: translateY(-2px);
      }
    }

    &.signup {
      background-color: transparent;
      color: #e74c3c;
      border: 2px solid #e74c3c;
      margin-top: 0.5rem;

      &:hover {
        background-color: #e74c3c;
        color: white;
        transform: translateY(-2px);
      }
    }
  `;

  const Text = styled.span`
    color: #fff;
    margin-top: 1rem;
    text-align: center;
  `;

  const ErrorMessage = styled.div`
    color: #e74c3c;
    padding: 0.8rem;
    text-align: center;
    font-size: 0.9rem;
  `;

  return (
    <PageTransition>
      <PageContainer>
        <ButtonsContainer>
          <Button
            to="/guest-booking"
            className="primary"
            onClick={handleGuestBooking}
          >
            Book As Guest
          </Button>

          <Button to="/login" className="secondary"
          onClick={handleLoginClick}
          >
            Login To Book
          </Button>

          <Text>Not Registered yet?</Text>
          <Button to="/signup" className="signup"
          onClick={handleSignUpClick}
          >
            Sign Up Now
          </Button>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </ButtonsContainer>
      </PageContainer>
    </PageTransition>
  );
};

export default LandingPage;
