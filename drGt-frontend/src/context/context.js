import { createContext, useState } from "react";

export const myContext = createContext();

function ContextProvider(props) {
  const [vehicleStatus, setVehicleStatus] = useState({});
  const [vehiclesCondition, setVehiclesCondition] = useState({});
  const [fuelCosts, setFuelCosts] = useState({});
  const [displayData, setDisplayData] = useState([]);

  let states = {
    vehicleStatus,
    setVehicleStatus,
    vehiclesCondition,
    setVehiclesCondition,
    fuelCosts,
    setFuelCosts,
    displayData,
    setDisplayData,
  };

  return (
    <myContext.Provider value={states}>{props.children}</myContext.Provider>
  );
}

export default ContextProvider;
