import ExpenseList from "../ExpenseList/ExpenseList";

const ExpenseListByUser = ({
  expenses,
  onSelectItem,
  multiSelect,
  selectedItems,
  setSelectedItems,
  currentUser,
  otherUser,
}) => {
  const currentUserExpenses = expenses.filter(
    (expense) => !expense.archived && expense.paid_by === currentUser
  );

  const otherUserExpenses = expenses.filter(
    (expense) => !expense.archived && expense.paid_by === otherUser
  );

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
      <div className="expense expense-title">
        <ExpenseList
          title={"My expenses"}
          currentExpenses={currentUserExpenses}
          onSelectItem={onSelectItem}
          multiSelect={multiSelect}
          selectedItems={selectedItems}
          selectAllCurrent={() => selectAllUser(currentUser)}
        />
      </div>
      <div className="expense expense-title">
        <ExpenseList
          title={`${otherUser}'s expenses`}
          currentExpenses={otherUserExpenses}
          onSelectItem={onSelectItem}
          multiSelect={multiSelect}
          selectedItems={selectedItems}
          selectAllCurrent={() => selectAllUser(otherUser)}
        />
      </div>
    </>
  );
};

export default ExpenseListByUser;
