import { BiUserCircle } from "react-icons/bi";

import { BiCalendar } from "react-icons/bi";

const Toggle = ({ isOn, onToggle }) => {
  return (
    <button className={`toggle ${isOn ? "active" : ""}`} onClick={onToggle}>
      <div className="option option-1">
        <BiUserCircle />
      </div>
      <div className="option option-2">
        <BiCalendar />
      </div>
    </button>
  );
};

export default Toggle;
