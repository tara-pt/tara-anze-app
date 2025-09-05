import { BiArchiveIn } from "react-icons/bi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BiSelectMultiple } from "react-icons/bi";

const MultiSelectOverlay = ({
  multiSelect,
  selectedItems,
  expenses,
  selectAll,
  setMultiSelect,
  cancelSelection,
}) => {
  return (
    <div className="multiselect">
      {multiSelect ? (
        <>
          <button onClick={cancelSelection}>Cancel</button>
          <button onClick={selectAll}>
            <BiSelectMultiple
              style={{
                opacity: expenses.length === selectedItems.length ? 1 : 0.5,
              }}
            />
          </button>
          <button>
            <BiMoneyWithdraw />
          </button>
          <button>
            <BiArchiveIn />
          </button>
        </>
      ) : (
        <button onClick={setMultiSelect}>Select</button>
      )}
    </div>
  );
};

export default MultiSelectOverlay;
