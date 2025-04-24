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
      padding-bottom: 4.5rem;
    }
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

  const TimeSlotContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 0.8rem;
    background-color: #2a2a2a;
    padding: 1.5rem;
    border-radius: 12px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(3, 1fr);
      padding: 1rem;
      gap: 0.6rem;
    }
  `;

  const TimeSlot = styled.button`
    padding: 0.8rem;
    border-radius: 6px;
    border: 1px solid ${props => props.selected ? '#4caf50' : '#333'};
    background-color: ${props => props.selected ? '#4caf50' : 'transparent'};
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: ${props => props.disabled ? 0.5 : 1};
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
    opacity: 0.5;
    width: 150px;
    text-align: center;

    &:hover {
      background-color: #45a049;
      transform: translateY(-2px);
      opacity: 0.8;
    }

    @media (max-width: 768px) {
      bottom: 1rem;
      left: 1rem;
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
    background-color: #2a2a2a;
    padding: 1.5rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      padding: 1rem;
    }
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

    @media (max-width: 768px) {
      width: calc(100% - 2rem);
      position: fixed;
      bottom: 1rem;
      right: 1rem;
      margin: 0;
      width: calc(50% - 1.5rem);
      z-index: 10;
    }
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
    background: ${(props) => (props.isSunday ? "#242424" : "#3a3a3a")};
    color: ${(props) => (props.isSunday ? "#666666" : "white")};
    padding: 0.8rem 0.5rem;
    text-align: center;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.9rem;
    opacity: ${(props) => (props.isSunday ? 0.6 : 1)};
    position: relative;

    ${(props) =>
      props.isSunday &&
      `
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
    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    return (
      <DayBoxContainer>
        {days.map((day, index) => (
          <DayBox key={day} isSunday={day === "SUN"}>
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
