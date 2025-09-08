import FloatingButton from "../../FloatingButton/FloatingButton";
import CalendarEvent from "../Calendar/CalendarEvent/CalendarEvent";

const CalendarModal = ({ viewDay, closeModal }) => {
  function formatFullDay(fullDay) {
    const date = new Date(fullDay);
    return new Intl.DateTimeFormat("sl", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(date);
  }

  const currentDay = formatFullDay(viewDay.fullDay);
  const noEvents = viewDay.events.length < 1;

  console.log(viewDay.fullDay, currentDay);

  return (
    <div className="calendar-modal">
      <div className="calendar-content">
        <button onClick={closeModal} className="close-modal"></button>
        <h3>{currentDay}</h3>
        <h4>{noEvents ? "No events for today." : "Events"}</h4>
        <ul>
          {viewDay.events.map((event) => (
            <li key={event.id}>
              <CalendarEvent event={event} />
            </li>
          ))}
        </ul>
        <FloatingButton bottom={true}>Add new event</FloatingButton>
      </div>
    </div>
  );
};

export default CalendarModal;
