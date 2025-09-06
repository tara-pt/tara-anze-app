import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpenseList = ({
  title,
  currentExpenses,
  multiSelect,
  onSelectItem,
  selectedItems,
  selectAllCurrent,
  showUserInfo = false,
  showDate = true,
}) => {
  const allSelected = currentExpenses.every((exp) =>
    selectedItems.includes(exp.id)
  );
  return (
    <>
      <h2>
        <button
          className={`checkbox ${allSelected ? "checked" : ""}`}
          onClick={selectAllCurrent}
          style={{
            opacity: multiSelect ? 1 : 0,
            pointerEvents: multiSelect ? "all" : "none",
          }}
        ></button>
        <span>{title}</span>
      </h2>
      <ul className="expense-all">
        {currentExpenses.map((exp) => (
          <li key={exp.id}>
            {multiSelect && (
              <button
                className={`checkbox ${
                  selectedItems.includes(exp.id) ? "checked" : ""
                }`}
                onClick={() => onSelectItem(exp.id)}
              ></button>
            )}
            <ExpenseItem
              data={exp}
              isSelected={selectedItems.includes(exp.id)}
              showUserInfo={showUserInfo}
              showDate={showDate}
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExpenseList;
