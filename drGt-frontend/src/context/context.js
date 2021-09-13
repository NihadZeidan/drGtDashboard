import { createContext, useState } from "react";

export const myContext = createContext();

function ContextProvider(props) {
  const [vehicleStatus, setVehicleStatus] = useState({});

  let states = {
    vehicleStatus,
    setVehicleStatus,
  };

  return (
    <myContext.Provider value={states}>{props.children}</myContext.Provider>
  );
}

export default ContextProvider;
