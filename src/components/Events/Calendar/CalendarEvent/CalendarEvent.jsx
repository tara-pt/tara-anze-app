import { BiTime } from "react-icons/bi";
import { BiMap } from "react-icons/bi";
import { formatDateTime } from "../../../../functions/formatDateTime";

const CalendarEvent = ({ event }) => {
  const { date, time } = formatDateTime(event.dateTime);
  return (
    <>
      <div className="calendar-event">
        <span className="event-name">{event.name}</span>
        <div>
          <span className="event-time">
            <BiTime />
            {time}
          </span>
          <span className="event-location">
            <BiMap />
            {event.location}
          </span>
        </div>
      </div>
    </>
  );
};

export default CalendarEvent;
