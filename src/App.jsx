import { useState } from "react";
import Expenses from "./components/Expenses/Expenses";
import Events from "./components/Events/Events";
import { UserProvider } from "./context/UserContext";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import { BiArrowBack } from "react-icons/bi";

function App() {
  const [showScreen, setShowScreen] = useState("home");

  return (
    <UserProvider>
      {showScreen === "home" ? (
        <div>
          <button onClick={() => setShowScreen("expenses")}>Expenses</button>
          <button onClick={() => setShowScreen("events")}>Events</button>
        </div>
      ) : (
        <FloatingButton onClick={() => setShowScreen("home")} sticky={true}>
          <BiArrowBack />
        </FloatingButton>
      )}
      {showScreen === "expenses" && <Expenses />}
      {showScreen === "events" && <Events />}
    </UserProvider>
  );
}

export default App;
