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

  console.log(viewDay.fullDay, currentDay);

  return (
    <div className="calendar-modal">
      <div className="calendar-content">
        <button onClick={closeModal} className="close-modal"></button>
        <p>{currentDay}</p>
        <ul>
          {viewDay.events.map((event) => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarModal;
