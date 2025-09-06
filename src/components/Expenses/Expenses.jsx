import expenses from "../../data/expenses";
import { useUser } from "../../context/UserContext";
import { useState } from "react";
import MultiSelect from "./MultiSelect/MultiSelect";
import Toggle from "../Toggle/Toggle";
import ExpenseListByUser from "./ExpenseListByUser/ExpenseListByUser";
import ExpenseListByDate from "./ExpenseListByDate/ExpenseListByDate";
import Balance from "./Balance/Balance";
import ActionOverlay from "../ActionOverlay/ActionOverlay";

const Expenses = () => {
  const { currentUser, setCurrentUser } = useUser();
  const [toggleToDate, setToggleToDate] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const otherUser = currentUser === "Tara" ? "Anze" : "Tara";

  // FUNCTIONS FOR SELECTING ITEMS

  const selectItem = (item_id) => {
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

  return (
    <>
      <Balance
        expenses={expenses}
        currentUser={currentUser}
        otherUser={otherUser}
      />
      <ActionOverlay position={"right"}>
        <MultiSelect
          multiSelect={multiSelect}
          selectAll={() => selectAll()}
          expenses={expenses}
          selectedItems={selectedItems}
          cancelSelection={() => cancelSelection()}
          setMultiSelect={() => setMultiSelect(true)}
        />
        <div className="expense-toggle-wrapper">
          <Toggle
            isOn={toggleToDate}
            onToggle={() => setToggleToDate(!toggleToDate)}
          />
        </div>
      </ActionOverlay>

      <div>
        {toggleToDate ? (
          <ExpenseListByDate
            expenses={expenses}
            onSelectItem={selectItem}
            multiSelect={multiSelect}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
          />
        ) : (
          <ExpenseListByUser
            expenses={expenses}
            onSelectItem={selectItem}
            multiSelect={multiSelect}
            selectedItems={selectedItems}
            setSelectedItems={setSelectedItems}
            currentUser={currentUser}
            otherUser={otherUser}
          />
        )}
      </div>
    </>
  );
};

export default Expenses;
