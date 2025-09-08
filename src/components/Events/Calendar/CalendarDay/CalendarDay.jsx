const CalendarDay = ({ dayData, viewDay }) => {
  return (
    <div
      className={`calendar-cell ${
        !!!dayData
          ? "other-month"
          : dayData.events.length > 0
          ? "has-event"
          : ""
      }`}
      onClick={viewDay}
    >
      {!!dayData && (
        <>
          <span className="day-number">{dayData.day + 1}</span>
          <ul>
            {dayData.events.map((event) => (
              <li key={event.id}>{event.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CalendarDay;
