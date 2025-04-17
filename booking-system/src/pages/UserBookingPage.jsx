import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSunday, isToday, parse, isBefore } from "date-fns";
import PageTransition from "../components/PageTransition";

const UserBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "User";
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTimeConfirmed, setIsTimeConfirmed] = useState(false);

  //Checking if the time slot is disabled
  const isTimeSlotDisabled = (time) => {
    if (!isToday(selectedDate)) return false;

    const now = new Date();
    const [hours, minutes] = time.split(":").map(Number);
    const timeSlotDate = new Date(selectedDate);
    timeSlotDate.setHours(hours, minutes, 0, 0);

    return isBefore(timeSlotDate, now);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    setIsTimeConfirmed(false);
  };

  const handleTimeSelect = (time) => {
    if (!isTimeSlotDisabled(time)) {
      setSelectedTime(time);
      setIsTimeConfirmed(false);
    }
  };

  const handleTimeConfirm = () => {
    setIsTimeConfirmed(!isTimeConfirmed);
  };

  const handleContinue = () => {
    if (
      selectedDate &&
      selectedTime &&
      !isSunday(selectedDate) &&
      !isTimeSlotDisabled(selectedTime)
    ) {
      navigate("/booking-confirmation", {
        state: {
          selectedDate,
          selectedTime,
          username
        },
      });
    }
  };

  const tileDisabled = ({ date }) => {
    return isSunday(date) || isBefore(date, new Date().setHours(0, 0, 0, 0));
  };

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
    "15:00", "15:30", "16:00", "16:30"
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <PageTransition>
      <PageContainer>
        <WelcomeText>Welcome, {username}!</WelcomeText>
        
        <SearchInput
          type="text"
          placeholder="Search for your barber's shop..."
          value={searchQuery}
          onChange={handleSearch}
        />

        <BookingGrid>
          <CalendarSection>
            <WeekDayHeader>
              <WeekDay>MON</WeekDay>
              <WeekDay>TUE</WeekDay>
              <WeekDay>WED</WeekDay>
              <WeekDay>THU</WeekDay>
              <WeekDay>FRI</WeekDay>
              <WeekDay>SAT</WeekDay>
              <WeekDay className="closed">
                SUN
                <ClosedText>(Closed)</ClosedText>
              </WeekDay>
            </WeekDayHeader>

            <MonthHeader>
              <MonthNavButton>«</MonthNavButton>
              <MonthNavButton>‹</MonthNavButton>
              <MonthTitle>April 2025</MonthTitle>
              <MonthNavButton>›</MonthNavButton>
              <MonthNavButton>»</MonthNavButton>
            </MonthHeader>

            <CalendarDays>
              <CalendarHeader>
                <Day>MON</Day>
                <Day>TUE</Day>
                <Day>WED</Day>
                <Day>THU</Day>
                <Day>FRI</Day>
                <Day>SAT</Day>
                <Day>SUN</Day>
              </CalendarHeader>
              {/* Calendar days would be dynamically generated here */}
            </CalendarDays>
          </CalendarSection>

          <TimeSection>
            <TimeGrid>
              <TimeSlot>09:00</TimeSlot>
              <TimeSlot>09:30</TimeSlot>
              <TimeSlot active>10:00</TimeSlot>
              <TimeSlot>10:30</TimeSlot>
              <TimeSlot>11:00</TimeSlot>
              <TimeSlot>11:30</TimeSlot>
              <TimeSlot>12:00</TimeSlot>
              <TimeSlot>12:30</TimeSlot>
              <TimeSlot>13:00</TimeSlot>
              <TimeSlot>13:30</TimeSlot>
              <TimeSlot>14:00</TimeSlot>
              <TimeSlot>14:30</TimeSlot>
              <TimeSlot>15:00</TimeSlot>
              <TimeSlot>15:30</TimeSlot>
              <TimeSlot>16:00</TimeSlot>
              <TimeSlot>16:30</TimeSlot>
            </TimeGrid>
          </TimeSection>
        </BookingGrid>

        <BookButton onClick={handleContinue} disabled={!selectedDate || !selectedTime}>
          Book Appointment
        </BookButton>
      </PageContainer>
    </PageTransition>
  );
};

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
  background-color: #1a1a1a;
  color: white;
  gap: 2rem;
`;

const WelcomeText = styled.h1`
  color: #4caf50;
  font-size: 2rem;
  margin: 0;
  text-align: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #333;
  background-color: #2a2a2a;
  color: white;
  font-size: 1rem;

  &::placeholder {
    color: #666;
  }
`;

const BookingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CalendarSection = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 1.5rem;
`;

const WeekDayHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const WeekDay = styled.div`
  text-align: center;
  font-size: 0.9rem;
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.closed {
    color: #e74c3c;
  }
`;

const ClosedText = styled.span`
  font-size: 0.7rem;
  margin-top: 0.2rem;
`;

const MonthHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const MonthNavButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;

  &:hover {
    color: #4caf50;
  }
`;

const MonthTitle = styled.span`
  color: white;
  font-size: 1.1rem;
`;

const CalendarDays = styled.div`
  display: grid;
  gap: 0.5rem;
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Day = styled.div`
  text-align: center;
  color: #4caf50;
  font-size: 0.8rem;
`;

const TimeSection = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 1.5rem;
`;

const TimeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1rem;
`;

const TimeSlot = styled.button`
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid ${props => props.active ? '#4caf50' : '#333'};
  background-color: ${props => props.active ? '#4caf50' : 'transparent'};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #4caf50;
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

const BookButton = styled.button`
  padding: 1rem 2rem;
  border-radius: 8px;
  border: none;
  background-color: #4caf50;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  &:disabled {
    background-color: #333;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    background-color: #45a049;
    transform: translateY(-2px);
  }
`;

export default UserBookingPage; 