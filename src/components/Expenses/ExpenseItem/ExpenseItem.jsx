import { useState } from "react";
import { useUser } from "../../../context/UserContext";

function formatDateTime(isoString) {
  const dateObj = new Date(isoString);

  const date = dateObj.toLocaleDateString("sl-SI", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const time = dateObj.toLocaleTimeString("sl-SI", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return { date, time };
}

const ExpenseItem = ({ data, isSelected }) => {
  const { currentUser, setCurrentUser } = useUser();
  const [isExpanded, setIsExpanded] = useState(false);
  const { date, time } = formatDateTime(data.date);

  return (
    <div
      className={`expense-item ${isExpanded ? "expanded" : "collapsed"} ${
        isSelected ? "selected" : ""
      }`}
    >
      <div className="main" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="info">
          <span className="date">{date}</span>
          <span className="name">{data.name}:</span>
          <span className="value">{data.value}€</span>
        </div>
        <div className="more">
          <button className="chevron"></button>
        </div>
      </div>

      <div className="details">
        <div className="details-text">
          <span>
            Added: {date} {time}
          </span>
          <span>Extra info: {data.extraInfo}</span>
          <span>Split: {data.split * 100}%</span>
        </div>
        <div className="details-buttons">
          <button>Settle</button>
          <button>Archive</button>
          {currentUser !== data.paid_by && <button>Dispute</button>}
          {currentUser === data.paid_by && (
            <>
              <button>Edit</button>
              <button>Delete</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;
