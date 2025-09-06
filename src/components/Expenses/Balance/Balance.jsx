import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";

const Balance = ({ expenses, currentUser, otherUser }) => {
  const [showMore, setShowMore] = useState(false);

  const sum_me = expenses
    .filter((expense) => !expense.archived && expense.paid_by === currentUser)
    .reduce((sum, expense) => sum + expense.value, 0);

  const sum_you = expenses
    .filter((expense) => !expense.archived && expense.paid_by !== currentUser)
    .reduce((sum, expense) => sum + expense.value, 0);

  const total = sum_me - sum_you;

  const balance_color = total === 0 ? "" : total < 0 ? "negative" : "positive";
  const balance_prefix = total === 0 ? "" : total < 0 ? "-" : "+";
  const balance_owed = Math.round(Math.abs(total));

  return (
    <div className="balance">
      <div
        className={`balance-value ${balance_color}`}
        onClick={() => setShowMore(!showMore)}
      >
        {balance_prefix}
        {balance_owed}€
        <BiInfoCircle style={{ opacity: showMore ? 0 : 1 }} />
      </div>

      <div className={`more-info ${showMore ? "expanded" : ""}`}>
        <span>
          {total === 0
            ? "All expenses settled."
            : total < 0
            ? `You owe ${otherUser}: ${balance_owed}€`
            : `${otherUser} owes you: ${balance_owed}€`}
        </span>
        <span>Total paid by me: {sum_me}€</span>
        <span>
          Total paid by {otherUser}: {sum_you}€
        </span>
      </div>
    </div>
  );
};

export default Balance;
