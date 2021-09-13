import "./Styles/App.css";
import ContextProvider from "./context/context";
import VehiclesStatus from "./components/VehiclesStatus";

function App() {
  return (
    <ContextProvider>
      <VehiclesStatus />
    </ContextProvider>
  );
}

export default App;
