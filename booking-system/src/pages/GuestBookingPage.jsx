import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { format, isSunday, isToday, parse, isBefore } from "date-fns";
import PageTransition from "../components/PageTransition";

const GuestBookingPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isTimeConfirmed, setIsTimeConfirmed] = useState(false);
  const navigate = useNavigate();

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
      navigate("/guest-booking-details", {
        state: {
          selectedDate,
          selectedTime,
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
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 1200px;
    margin-top: 2rem;
    padding-bottom: 5rem;

    @media (max-width: 768px) {
      margin-top: 1rem;
      padding-bottom: 7rem;
    }
  `;

  const MainContent = styled.div`
    display: flex;
    gap: 2rem;
    width: 100%;

    @media (max-width: 1024px) {
      flex-direction: column;
      gap: 1rem;
    }
  `;

  const LeftSection = styled.div`
    width: 40%;
    flex-shrink: 0;

    @media (max-width: 1024px) {
      width: 100%;
    }
  `;

  const RightSection = styled.div`
    flex-grow: 1;

    @media (max-width: 1024px) {
      width: 100%;
      margin-top: -1rem;
    }
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

  const CalendarContainer = styled.div`
    .react-calendar {
      width: 100%;
      background: #2a2a2a;
      border: none;
      border-radius: 8px;
      padding: 1rem;
      color: white;

      .react-calendar__navigation {
        margin-bottom: 1rem;
        display: flex;
        align-items: center;

        .react-calendar__navigation__label {
          font-weight: bold;
          font-size: 1.2rem;
          text-transform: capitalize;
          flex-grow: 1;
          text-align: center;
        }

        button {
          color: white;
          background: transparent;
          border: none;
          padding: 0.5rem;
          font-weight: bold;

          &:enabled:hover,
          &:enabled:focus {
            background-color: #ffffff14;
          }

          &:disabled {
            color: #ffffff80;
          }
        }
      }

      .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.8em;
        padding: 0.5rem 0;

        abbr {
          text-decoration: none;
          color: #4caf50;
        }
      }

      .react-calendar__month-view__days {
        display: grid !important;
        grid-template-columns: repeat(7, 1fr);
        gap: 4px;
      }

      .react-calendar__tile {
        padding: 1.5rem 0.5rem;
        font-size: 1.1rem;
        color: white;
        background: #3a3a3a;
        border-radius: 4px;
        margin: 2px;
        max-width: initial !important;

        &:enabled:hover,
        &:enabled:focus {
          background-color: #4caf50;
          color: white;
        }
        &--active {
          background-color: #4caf50 !important;
          color: white !important;
        }
        &.react-calendar__month-view__days__day--neighboringMonth {
          background-color: #242424;
          color: #ffffff80;
        }
        &:disabled {
          background-color: #242424;
          color: #ffffff80;
        }
      }
    }
  `;

  const TimeSlotContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
    padding: 1rem;
    background: #ffffff14;
    border-radius: 8px;
  `;

  const TimeSlot = styled.button`
    padding: 0.8rem;
    background: ${(props) => {
      if (props.disabled) return "#666666";
      if (props.selected) return "#4CAF50";
      return "transparent";
    }};
    border: 2px solid ${(props) => (props.disabled ? "#666666" : "#4CAF50")};
    border-radius: 4px;
    color: ${(props) => (props.disabled ? "#999999" : "white")};
    cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
    opacity: ${(props) => (props.disabled ? 0.6 : 1)};
    transition: all 0.3s ease;

    &:hover {
      background: ${(props) => (props.disabled ? "#666666" : "#4CAF50")};
      transform: ${(props) => (props.disabled ? "none" : "translateY(-2px)")};
    }
  `;

  const BackButton = styled(Link)`
    position: fixed;
    bottom: 2rem;
    left: 2rem;
    padding: 0.8rem 1.5rem;
    background-color: #4caf50;
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

  const Button = styled.button`
    padding: 1rem 2rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;

    &:hover {
      background-color: #45a049;
      transform: translateY(-2px);
    }
  `;

  const BookingDetailsCard = styled.div`
    background: #ffffff14;
    border-radius: 8px;
    overflow: hidden;
    margin-top: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 200px;
  `;

  const DateHeader = styled.div`
    background: white;
    color: black;
    padding: 0.8rem;
    text-align: center;
    font-weight: bold;
    border-radius: 8px 8px 0 0;
  `;

  const DetailsContent = styled.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-between;
  `;

  const DetailsSection = styled.div`
    border-radius: 4px;
    background: var(--accent);
    padding: 1rem;
    margin-bottom: 1rem;
  `;

  const DetailRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    border-radius: 4px;
  `;

  const TimeDisplay = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
  `;

  const Checkbox = styled.button`
    width: 24px;
    height: 24px;
    background: transparent;
    border: 2px solid #4caf50;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: all 0.2s ease;

    &:hover {
      background: ${(props) => (props.checked ? "#45a049" : "#ffffff14")};
    }

    svg {
      width: 16px;
      height: 16px;
      color: white;
      opacity: ${(props) => (props.checked ? 1 : 0)};
    }
  `;

  const CheckIcon = () => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  const ContinueButton = styled(Button)`
    width: 80%;
    margin: 2rem auto 1rem auto;
    padding: 1.2rem;
    font-size: 1.2rem;
  `;

  const NoAvailabilityMessage = styled.div`
    color: #e74c3c;
    text-align: center;
    padding: 2.5rem;
    background: #ffffff14;
    border-radius: 8px;
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 0.5px;
  `;

  const PageTitle = styled.h1`
    color: white;
    font-size: 2rem;
    text-align: center;
    margin-bottom: 1.5rem;
    font-weight: bold;
  `;

  const DayBoxContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 4px;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background: #2a2a2a;
    border-radius: 8px;
  `;

  const DayBox = styled.div`
    background: ${props => props.isSunday ? "#242424" : "#3a3a3a"};
    color: ${props => props.isSunday ? "#666666" : "white"};
    padding: 0.8rem 0.5rem;
    text-align: center;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.9rem;
    opacity: ${props => props.isSunday ? 0.6 : 1};
    position: relative;

    ${props => props.isSunday && `
      &:after {
        content: '(Closed)';
        display: block;
        font-size: 0.7rem;
        color: #e74c3c;
        margin-top: 2px;
      }
    `}
  `;

  const DayBoxes = () => {
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    
    return (
      <DayBoxContainer>
        {days.map((day, index) => (
          <DayBox key={day} isSunday={day === 'SUN'}>
            {day}
          </DayBox>
        ))}
      </DayBoxContainer>
    );
  };

  return (
    <PageTransition>
      <PageContainer>
        <BackButton to="/">Back</BackButton>
        <ContentContainer>
          <PageTitle>Book as a Guest!</PageTitle>
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
              <DayBoxes />
              <CalendarContainer>
                <Calendar
                  onChange={handleDateChange}
                  value={selectedDate}
                  minDate={new Date()}
                  tileDisabled={tileDisabled}
                  calendarType="iso8601"
                  formatShortWeekday={(locale, date) =>
                    ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'][
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
                        past={isDisabled}
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
                        <h3>Available Slots</h3>
                        <DetailRow>
                          <span>Time: {selectedTime}</span>
                          <Checkbox
                            onClick={handleTimeConfirm}
                            checked={isTimeConfirmed}
                            aria-label="Confirm time selection"
                          >
                            {isTimeConfirmed && <CheckIcon />}
                          </Checkbox>
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

export default GuestBookingPage;
