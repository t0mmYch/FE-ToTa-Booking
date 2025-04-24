import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PageTransition from "../components/PageTransition";
import { Link } from "react-router-dom";

const GuestBookingDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedDate, selectedTime } = location.state || {};
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/booking-confirmation", {
      state: {
        ...formData,
        selectedDate,
        selectedTime,
      },
    });
  };

  const handleBack = () => {
    navigate('/guest-booking');
  };

  return (
    <PageTransition>
      <PageContainer>
        <ContentContainer>
          <SearchBar placeholder="Your Barber's truly (one shop)" />

          <BookingSection>
            <BookingTitle>Guest's Booking:</BookingTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Full Name:</Label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Email:</Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>Phone no:</Label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>

              <BookingDetails>
                <DetailText>Thursday, April 24</DetailText>
                <DetailText>Time: 11:00</DetailText>
              </BookingDetails>

              <ButtonContainer>
                <BackButton onClick={handleBack}>Back</BackButton>
                <SubmitButton type="submit">Continue</SubmitButton>
              </ButtonContainer>
            </Form>
          </BookingSection>
        </ContentContainer>
      </PageContainer>
    </PageTransition>
  );
};

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: white;
  color: black;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
`;

const LoginButton = styled.button`
  padding: 0.5rem 1.5rem;
  border: 2px solid black;
  border-radius: 4px;
  background: transparent;
  color: black;
  font-size: 1rem;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 1rem;
  margin-bottom: 2rem;
  border: none;
  border-radius: 8px;
  background-color: white;
  font-size: 1rem;

  &::placeholder {
    color: #666;
  }
`;

const BookingSection = styled.div`
  width: 100%;
  max-width: 500px;
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 2rem;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 100%;
  }
`;

const BookingTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: white;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.2rem;
  color: white;
`;

const Input = styled.input`
  padding: 1rem;
  border: none;
  border-radius: 8px;
  background-color: white;
  font-size: 1rem;
  width: 100%;

  &::placeholder {
    color: #666;
  }
`;

const BookingDetails = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #333;
  border-radius: 8px;
`;

const DetailText = styled.p`
  margin: 0.5rem 0;
  font-size: 1.1rem;
  color: white;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;
`;

const BackButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  cursor: pointer;
  opacity: 0.5;
  width: 150px;
  text-align: center;
  padding: 0.8rem 1.5rem;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    width: calc(50% - 1.5rem);
    text-align: center;
    border-radius: 8px;
    font-size: 1rem;
    padding: 1rem;
    transform: none;

    &:hover {
      transform: translateY(-2px);
      background-color: #45a049;
    }
  }
`;

const SubmitButton = styled.button`
  flex: 2;
  padding: 1.2rem;
  font-size: 1.2rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    width: calc(50% - 1.5rem);
  }
`;

export default GuestBookingDetailsPage; 