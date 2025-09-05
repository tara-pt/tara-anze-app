import expenses from "../../data/expenses";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import ExpenseList from "./ExpenseList/ExpenseList";
import MultiSelectOverlay from "./MultiSelectOverlay/MultiSelectOverlay";

const Expenses = () => {
  const { currentUser, setCurrentUser } = useUser();
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const otherUser = currentUser === "Tara" ? "Anze" : "Tara";

  // SELECT AND CALCULATE EXPENSES

  const sum_me = expenses
    .filter((expense) => !expense.archived && expense.paid_by === currentUser)
    .reduce((sum, expense) => sum + expense.value, 0);

  const sum_you = expenses
    .filter((expense) => !expense.archived && expense.paid_by !== currentUser)
    .reduce((sum, expense) => sum + expense.value, 0);

  const currentUserExpenses = expenses.filter(
    (expense) => !expense.archived && expense.paid_by === currentUser
  );

  const otherUserExpenses = expenses.filter(
    (expense) => !expense.archived && expense.paid_by === otherUser
  );

  const total = sum_me - sum_you;

  // FUNCTIONS FOR SELECTING ITEMS

  const selectItem = (item_id) => {
    console.log(selectedItems);
    setSelectedItems((prev) =>
      prev.includes(item_id)
        ? prev.filter((i) => i !== item_id)
        : [...prev, item_id]
    );
  };

  const cancelSelection = () => {
    setSelectedItems([]);
    setMultiSelect(false);
  };

  const selectAll = () => {
    if (expenses.length === selectedItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(expenses.map((exp) => exp.id));
    }
  };

  const selectAllUser = (user) => {
    const userExpenseIds = expenses
      .filter((exp) => exp.paid_by === user && !exp.archived)
      .map((exp) => exp.id);

    const allSelected = userExpenseIds.every((id) =>
      selectedItems.includes(id)
    );

    if (allSelected) {
      setSelectedItems((prev) =>
        prev.filter((id) => !userExpenseIds.includes(id))
      );
    } else {
      setSelectedItems((prev) =>
        Array.from(new Set([...prev, ...userExpenseIds]))
      );
    }
  };

  return (
    <>
      <p>
        Status: You paid {sum_me}€.
        {total === 0
          ? " All expenses settled."
          : total < 0
          ? ` You owe ${otherUser} ${Math.abs(total)}€`
          : ` ${otherUser} owes you ${total}€`}
      </p>

      <MultiSelectOverlay
        multiSelect={multiSelect}
        selectAll={() => selectAll()}
        expenses={expenses}
        selectedItems={selectedItems}
        cancelSelection={() => cancelSelection()}
        setMultiSelect={() => setMultiSelect(true)}
      />

      <div>
        <div className="expense expense-mine">
          <ExpenseList
            title={"My expenses"}
            userExpenses={currentUserExpenses}
            onSelectItem={selectItem}
            multiSelect={multiSelect}
            selectedItems={selectedItems}
            selectAllUser={() => selectAllUser(currentUser)}
          />
        </div>
        <div className="expense expense-other">
          <ExpenseList
            title={`${otherUser}'s expenses`}
            userExpenses={otherUserExpenses}
            onSelectItem={selectItem}
            multiSelect={multiSelect}
            selectedItems={selectedItems}
            selectAllUser={() => selectAllUser(otherUser)}
          />
        </div>
      </div>
    </>
  );
};

export default Expenses;
