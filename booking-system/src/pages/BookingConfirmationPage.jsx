import React from 'react';
import { useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import PageTransition from '../components/PageTransition';


const BookingConfirmationPage = () => {
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};

  const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    });
  };

  //animation-tranasition/ pullIn
const pullIn = keyframes`
  0% {
    transform: translateX(100%) scale(0.7);
    opacity: 0;
  }
  70% {
    transform: translateX(-2%) scale(1.02);
    opacity: 1;
  }
  85% {
    transform: translateX(1%) scale(0.99);
  }
  100% {
    transform: translateX(0) scale(1);
  }
`;

const elementPullIn = keyframes`
  0% {
    transform: translateX(50px);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const filmGrain = keyframes`
  0%, 100% { opacity: 0.1; }
  25% { opacity: 0.15; }
  50% { opacity: 0.1; }
  75% { opacity: 0.15; }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1a1a1a;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  animation: ${pullIn} 1s cubic-bezier(0.22, 1, 0.36, 1) forwards;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: ${elementPullIn} 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.2s;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  color: #333;
  margin: 0;
`;

const UserName = styled.span`
  font-size: 1.2rem;
  color: #333;
`;

const SearchContainer = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: ${elementPullIn} 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.3s;
`;

const SearchText = styled.div`
  color: #333;
  font-size: 1.2rem;
`;

const ConfirmationContainer = styled.div`
  background: #4CAF50;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  position: relative;
  z-index: 1;
  margin: 2rem auto;
  max-width: 600px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  opacity: 0;
  animation: ${elementPullIn} 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  animation-delay: 0.4s;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E");
    opacity: 0.1;
    animation: ${filmGrain} 0.5s steps(1) infinite;
    pointer-events: none;
    mix-blend-mode: overlay;
  }
`;

const ConfirmationTitle = styled.h2`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ConfirmationText = styled.p`
  color: white;
  font-size: 1.5rem;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;



  return (
    <PageTransition>
      <PageContainer>
        <SearchContainer>
          <SearchText>Your Barber's truly (one shop)</SearchText>
        </SearchContainer>

        <ConfirmationContainer>
          <ConfirmationTitle>
            Hooray!!! You are BOOKED!!
          </ConfirmationTitle>
          <ConfirmationText>
            See you at {selectedTime} on {formatDate(selectedDate)}
          </ConfirmationText>
        </ConfirmationContainer>
      </PageContainer>
    </PageTransition>
  );
};

export default BookingConfirmationPage; 