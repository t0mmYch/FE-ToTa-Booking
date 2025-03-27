import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PageTransition from '../components/PageTransition';

const GuestBookingDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};

  // Redirect if no date/time selected
  useEffect(() => {
    if (!selectedDate || !selectedTime) {
      navigate('/guest-booking');
    }
  }, [selectedDate, selectedTime, navigate]);

  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters long';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone number validation
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleConfirmBooking = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to confirmation page with booking details
      navigate('/booking-confirmation', {
        state: {
          selectedDate,
          selectedTime,
          formData
        }
      });
    } catch (error) {
      console.error('Booking failed:', error);
      setErrors(prev => ({
        ...prev,
        submit: 'Failed to confirm booking. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <PageContainer>
        <BackButton to="/guest-booking">Back</BackButton>
        <ContentContainer>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Your Barber's truly (one shop)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>

          <BookingFormContainer>
            <BookingLabel>Guest's Booking:</BookingLabel>
            <BookingForm>
              <FormGroup>
                <Label>Full Name:</Label>
                <Input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  error={errors.fullName}
                />
                {errors.fullName && <ErrorMessage>{errors.fullName}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Email:</Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  error={errors.email}
                />
                {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Phone no:</Label>
                <Input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  error={errors.phoneNumber}
                />
                {errors.phoneNumber && <ErrorMessage>{errors.phoneNumber}</ErrorMessage>}
              </FormGroup>

              <BookingInfo>
                {selectedDate && (
                  <InfoText>{new Date(selectedDate).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long'
                  })}</InfoText>
                )}
              </BookingInfo>

              <BookingInfo>
                <InfoText>Time: {selectedTime}</InfoText>
              </BookingInfo>

              {errors.submit && <ErrorMessage center>{errors.submit}</ErrorMessage>}

              <ConfirmButton 
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
              </ConfirmButton>
            </BookingForm>
          </BookingFormContainer>
        </ContentContainer>
      </PageContainer>
    </PageTransition>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
  position: relative;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 2rem;
`;

const SearchContainer = styled.div`
  width: 100%;
  padding: 1rem;
  background: #ffffff14;
  border-radius: 8px;
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  background: white;
  font-size: 1rem;
  &::placeholder {
    color: #666;
  }
`;

const BookingFormContainer = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const BookingLabel = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
  min-width: 200px;
`;

const BookingForm = styled.div`
  flex-grow: 1;
  background: #ffffff14;
  border-radius: 8px;
  padding: 2rem;
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
  font-size: 1.1rem;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 2px solid ${props => props.error ? '#e74c3c' : 'transparent'};
  border-radius: 4px;
  background: white;
  font-size: 1rem;
  width: 100%;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#e74c3c' : '#4CAF50'};
  }
`;

const BookingInfo = styled.div`
  padding: 1rem;
  background: #ffffff0a;
  border-radius: 4px;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 1.1rem;
  font-weight: 500;
`;

const ErrorMessage = styled.span`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 0.25rem;
  text-align: ${props => props.center ? 'center' : 'left'};
  display: block;
`;

const ConfirmButton = styled.button`
  padding: 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: ${props => props.disabled ? 0.7 : 1};
  pointer-events: ${props => props.disabled ? 'none' : 'auto'};

  &:hover {
    background-color: #45a049;
    transform: ${props => props.disabled ? 'none' : 'translateY(-2px)'};
  }
`;

const BackButton = styled(Link)`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  padding: 0.8rem 1.5rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }
`;

export default GuestBookingDetailsPage; 