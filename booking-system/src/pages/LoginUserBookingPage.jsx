import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSunday, isToday, parse, isBefore } from "date-fns";
import PageTransition from "../components/PageTransition";

const LoginUserBookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username = location.state?.username || "User";
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTimeConfirmed, setIsTimeConfirmed] = useState(false);

  // Time slot disabled logic
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
          username,
        },
      });
    }
  };

  const tileDisabled = ({ date }) => {
    return isSunday(date) || isBefore(date, new Date().setHours(0, 0, 0, 0));
  };

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];

  return (
    <PageTransition>
      <PageContainer>
        <BackButton to="/">Back</BackButton>
        <ContentContainer>
          <WelcomeTitle>Welcome, {username}!</WelcomeTitle>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search for your barber's shop..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchContainer>

          <MainContent>
            <LeftSection>
              <CalendarContainer>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  minDate={new Date()}
                  tileDisabled={tileDisabled}
                  calendarType="iso8601"
                  formatShortWeekday={(locale, date) =>
                    ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"][
                      date.getDay() === 0 ? 6 : date.getDay() - 1
                    ]
                  }
                />
              </CalendarContainer>
            </LeftSection>

            <RightSection>
              {isSunday(selectedDate) ? (
                <NoAvailabilityMessage>
                  CLOSED ON SUNDAYS
                  <br />
                  <span
                    style={{
                      fontSize: "0.9em",
                      display: "block",
                      marginTop: "8px",
                    }}
                  >
                    Please select any other day to book your appointment
                  </span>
                </NoAvailabilityMessage>
              ) : (
                <TimeSlotContainer>
                  {timeSlots.map((time) => {
                    const isDisabled = isTimeSlotDisabled(time);
                    return (
                      <TimeSlot
                        key={time}
                        selected={selectedTime === time}
                        onClick={() => handleTimeSelect(time)}
                        disabled={isDisabled}
                      >
                        {time}
                      </TimeSlot>
                    );
                  })}
                </TimeSlotContainer>
              )}

              {selectedDate &&
                selectedTime &&
                !isSunday(selectedDate) &&
                !isTimeSlotDisabled(selectedTime) && (
                  <BookingDetailsCard>
                    <DateHeader>
                      {format(selectedDate, "EEEE, do 'of' MMMM")}
                    </DateHeader>
                    <DetailsContent>
                      <DetailsSection>
                        <DetailRow>
                          <span>Time: {selectedTime}</span>
                          <Checkbox
                            checked={isTimeConfirmed}
                            onChange={handleTimeConfirm}
                            aria-label="Confirm time selection"
                          />
                        </DetailRow>
                      </DetailsSection>
                      <ContinueButton
                        onClick={handleContinue}
                        disabled={
                          !selectedDate || !selectedTime || !isTimeConfirmed
                        }
                      >
                        Continue
                      </ContinueButton>
                    </DetailsContent>
                  </BookingDetailsCard>
                )}
            </RightSection>
          </MainContent>
        </ContentContainer>
      </PageContainer>
    </PageTransition>
  );
};

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 2rem;
  background-color: #1a1a1a;
  color: white;
  gap: 2rem;
`;

const WelcomeTitle = styled.h1`
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

const TimeSlot = styled.button`
  padding: 0.8rem;
  border-radius: 6px;
  border: 1px solid ${(props) => (props.selected ? "#4caf50" : "#333")};
  background-color: ${(props) => (props.selected ? "#4caf50" : "transparent")};
  color: white;
  cursor: pointer;
  transition: all 0.2s ease;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  font-weight: 600;

  &:hover:not(:disabled) {
    border-color: #4caf50;
    transform: translateY(-2px);
  }

  &:disabled {
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 768px) {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
`;

const BackButton = styled(Link)`
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  border: none;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 1rem;
  text-decoration: none;

  &:hover {
    background-color: #45a049;
    transform: translateY(-2px);
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
`;

const NoAvailabilityMessage = styled.p`
  color: #e74c3c;
  font-size: 1.2rem;
  text-align: center;
  margin: 0;
`;

const TimeSlotContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 0.8rem;
  background-color: #2a2a2a;
  padding: 1.5rem;
  border-radius: 12px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    padding: 1rem;
    gap: 0.6rem;
  }
`;

const BookingDetailsCard = styled.div`
  background-color: #2a2a2a;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const DateHeader = styled.h2`
  color: #4caf50;
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
`;

const DetailsContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const DetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #333;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #4caf50;
    &:after {
      content: "✓";
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 0.8rem;
    }
  }
`;

const ContinueButton = styled.button`
  padding: 1rem;
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

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CalendarContainer = styled.div`
  background-color: #2a2a2a;
  border-radius: 12px;
  padding: 1.5rem;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  .react-calendar {
    width: 100%;
    background-color: #2a2a2a;
    border: none;
    color: white;
    font-family: inherit;
    line-height: 1.5;
    padding: 1rem;

    abbr {
      text-decoration: none;
      font-weight: bold;
    }

    .react-calendar__navigation {
      height: 48px;
      margin-bottom: 1rem;

      button {
        min-width: 48px;
        font-size: 1.2rem;
        font-weight: bold;
        color: white;
        background: none;

        &:enabled:hover,
        &:enabled:focus {
          background-color: #333;
        }

        &[disabled] {
          background-color: transparent;
          color: #666;
        }
      }
    }

    .react-calendar__month-view__weekdays {
      color: #4caf50;
      font-size: 1rem;
      font-weight: bold;
      text-transform: uppercase;

      abbr {
        font-weight: bold;
        font-size: 0.9rem;
      }
    }

    .react-calendar__tile {
      height: 48px;
      font-size: 1.1rem;
      font-weight: 600;
      color: white;
      padding: 1rem 0.5rem;

      &:enabled:hover,
      &:enabled:focus {
        background-color: #4caf50;
      }
      &--active {
        background-color: #4caf50 !important;
        font-weight: bold;
      }
      &--now {
        background-color: #333;
        font-weight: bold;
      }
      &:disabled {
        background-color: #1a1a1a;
        color: #666;
      }
    }

    @media (max-width: 768px) {
      padding: 0.5rem;

      .react-calendar__navigation {
        height: 40px;

        button {
          font-size: 1rem;
          min-width: 40px;
        }
      }

      .react-calendar__month-view__weekdays {
        font-size: 0.9rem;

        abbr {
          font-size: 0.8rem;
        }
      }

      .react-calendar__tile {
        height: 40px;
        font-size: 1rem;
        padding: 0.8rem 0.4rem;
      }
    }

    @media (max-width: 480px) {
      .react-calendar__tile {
        height: 36px;
        font-size: 0.9rem;
        padding: 0.6rem 0.3rem;
      }
    }
  }
`;

export default LoginUserBookingPage;
