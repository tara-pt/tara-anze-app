import React, { useState } from "react";
import events from "../../../data/events.js";
import CalendarDay from "./CalendarDay/CalendarDay.jsx";
import FloatingButton from "../../FloatingButton/FloatingButton.jsx";
import CalendarModal from "../CalendarModal/CalendarModal.jsx";

const Calendar = ({ month, year }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [viewDay, setViewDay] = useState(false);

  const openModal = (day) => {
    setModalOpen(true);
    setViewDay(day);
  };

  const weekdays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  function generateDateISO(day, month, year, time) {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, 0));
    return date.toISOString().replace(".000", "");
  }

  function generateCalendar(year, month, events) {
    const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-based
    const firstDay = getMondayFirstDay(new Date(year, month - 1, 1));

    // Start with empty 42 slots
    const calendar = Array(42).fill(null);

    // Place the day numbers in the correct slots
    for (let day = 1; day <= daysInMonth; day++) {
      const index = firstDay + (day - 1); // offset by first day
      const fullDay = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      calendar[index] = { day: day - 1, fullDay, events: [] };
    }

    // Assign events to the right slots
    events.forEach((event) => {
      const eventDate = new Date(event.dateTime);
      if (
        eventDate.getFullYear() === year &&
        eventDate.getMonth() + 1 === month
      ) {
        const day = eventDate.getDate();
        const index = firstDay + (day - 1);
        if (calendar[index]) {
          calendar[index].events.push(event);

          calendar[index].events.sort((a, b) => {
            return new Date(a.dateTime) - new Date(b.dateTime);
          });
        }
      }
    });

    return calendar;
  }

  function getMondayFirstDay(date) {
    const day = date.getDay(); // 0=Sunday
    return (day + 6) % 7; // shift so 0=Monday
  }

  const calendar = generateCalendar(year, month, events);
  console.log(calendar);

  return (
    <>
      {modalOpen && (
        <CalendarModal
          viewDay={viewDay}
          closeModal={() => setModalOpen(false)}
        />
      )}
      <FloatingButton></FloatingButton>
      <h2 className="calendar-header">
        {new Intl.DateTimeFormat("sl", { month: "long" }).format(
          new Date(2025, month - 1, 1)
        )}
      </h2>
      <div className="weekdays">
        {weekdays.map((day) => (
          <div>{day}</div>
        ))}
      </div>
      <div className="calendar-grid">
        {calendar.map((day, i) => (
          <React.Fragment key={i}>
            <CalendarDay dayData={day} viewDay={() => openModal(day)} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default Calendar;

/*
TODO:
- add editing options for calendar modal (add & edit event)
- add month heading ✅
- add ability to go back/forward in months
*/
