import ExpenseList from "../ExpenseList/ExpenseList";

const ExpenseListByDate = ({
  expenses,
  onSelectItem,
  multiSelect,
  selectedItems,
  setSelectedItems,
}) => {
  const uniqueDates = Object.values(
    expenses.reduce((acc, expense) => {
      const day = expense.date.split("T")[0];
      if (!acc[day]) {
        acc[day] = expense.date;
      }
      return acc;
    }, {})
  ).sort((a, b) => new Date(b) - new Date(a));

  function getExpensesByDate(d) {
    const day = d.split("T")[0];
    return expenses
      .filter((expense) => expense.date.startsWith(day))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const selectAllByDate = (dateX) => {
    const day = dateX.split("T")[0];

    const dateExpenseIds = expenses
      .filter((exp) => exp.date.startsWith(day) && !exp.archived)
      .map((exp) => exp.id);

    const allSelected = dateExpenseIds.every((id) =>
      selectedItems.includes(id)
    );

    if (allSelected) {
      setSelectedItems((prev) =>
        prev.filter((id) => !dateExpenseIds.includes(id))
      );
    } else {
      setSelectedItems((prev) =>
        Array.from(new Set([...prev, ...dateExpenseIds]))
      );
    }
  };

  function formatDateTime(isoString) {
    const dateObj = new Date(isoString);

    const date = dateObj.toLocaleDateString("sl-SI", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const time = dateObj.toLocaleTimeString("sl-SI", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return { date, time };
  }

  return (
    <>
      {uniqueDates.map((dateEl, i) => (
        <div className="expense expense-title" key={i + dateEl}>
          <ExpenseList
            title={formatDateTime(dateEl).date}
            currentExpenses={getExpensesByDate(dateEl)}
            onSelectItem={onSelectItem}
            multiSelect={multiSelect}
            selectedItems={selectedItems}
            selectAllCurrent={() => selectAllByDate(dateEl)}
            showUserInfo={true}
            showDate={false}
          />
        </div>
      ))}
    </>
  );
};

export default ExpenseListByDate;
2;
