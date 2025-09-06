import { BiArchiveIn } from "react-icons/bi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { BiSelectMultiple } from "react-icons/bi";

const MultiSelect = ({
  multiSelect,
  selectedItems,
  expenses,
  selectAll,
  setMultiSelect,
  cancelSelection,
}) => {
  const setOpacityForMultiple = expenses.length === selectedItems.length;
  const setOpacityForOthers = selectedItems.length > 0;
  return (
    <div className="multiselect">
      {multiSelect ? (
        <>
          <button onClick={cancelSelection}>Cancel</button>
          <button onClick={selectAll}>
            <BiSelectMultiple
              style={{
                opacity: setOpacityForMultiple ? 1 : 0.5,
              }}
            />
          </button>
          <button>
            <BiMoneyWithdraw
              style={{
                opacity: setOpacityForOthers ? 1 : 0.5,
              }}
            />
          </button>
          <button>
            <BiArchiveIn
              style={{
                opacity: setOpacityForOthers ? 1 : 0.5,
              }}
            />
          </button>
        </>
      ) : (
        <button onClick={setMultiSelect}>Select</button>
      )}
    </div>
  );
};

export default MultiSelect;
