import "./Styles/App.css";
import ContextProvider from "./context/context";
import VehiclesStatus from "./components/VehiclesStatus";
import VehicleConditions from "./components/VehiclesConditions";
import FuelCosts from "./components/FuelCosts";
import Logo from "./components/logo";

function App() {
  return (
    <ContextProvider>
      <VehicleConditions />
      <FuelCosts />
      <VehiclesStatus />
      <Logo />
    </ContextProvider>
  );
}

export default App;
