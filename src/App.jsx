import { useState } from "react";
import "./App.css";
import Expenses from "./components/Expenses/Expenses";
import Events from "./components/Events/Events";
import { UserProvider } from "./context/UserContext";

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
        <button onClick={() => setShowScreen("home")}>Go back</button>
      )}
      {showScreen === "expenses" && <Expenses />}
      {showScreen === "events" && <Events />}
    </UserProvider>
  );
}

export default App;
