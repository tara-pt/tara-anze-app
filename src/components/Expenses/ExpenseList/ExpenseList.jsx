import ExpenseItem from "../ExpenseItem/ExpenseItem";

const ExpenseList = ({
  title,
  userExpenses,
  multiSelect,
  onSelectItem,
  selectedItems,
  selectAllUser,
}) => {
  const allSelected = userExpenses.every((exp) =>
    selectedItems.includes(exp.id)
  );
  return (
    <>
      <h2>
        {multiSelect && (
          <button
            className={`checkbox ${allSelected ? "checked" : ""}`}
            onClick={selectAllUser}
          ></button>
        )}
        {title}
      </h2>
      <ul className="expense-all">
        {userExpenses.map((exp) => (
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
            />
          </li>
        ))}
      </ul>
    </>
  );
};

export default ExpenseList;
