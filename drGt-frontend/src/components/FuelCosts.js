import React, { useEffect, useContext } from "react";
import superAgent from "superagent";
import { myContext } from "../context/context";
import "../Styles/fuelCosts.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function FuelCosts() {
  const { fuelCosts, setFuelCosts, displayData, setDisplayData } =
    useContext(myContext);

  // When Component did mount get the data from the backend
  useEffect(() => {
    superAgent
      .get("https://drgt-backend.herokuapp.com/vehicle-fuel")
      .then((result) => {
        //   Update the state
        setFuelCosts(result.body);
        // This state to display different time period month, week or day (default = month)
        setDisplayData(result.body.monthsSummery);
      })
      .catch((e) => console.error(e));
  }, []);

  //   This to calculate the total fuel litres needed
  // Calculate the total meters consumed
  let totalMeters = fuelCosts.monthsSummery
    ? fuelCosts.monthsSummery.reduce((acc, month) => {
      return (acc += month.uv);
    }, 0)
    : null;
  // Calculate total needed liters by divide total meters consumed / cars consumption per liter
  let averageFuelConsumption = (
    totalMeters / fuelCosts.allCarsConsumptionMetersPerLiter
  ).toFixed(1);

  //   Display
  return (
    <div id="fuelMainContainer">
      <p className="fuelTitle"> Fuel Costs </p>
      <div id="btns">
        <button onClick={() => setDisplayData(fuelCosts.monthsSummery)}>
          Per Month{" "}
        </button>
        <button onClick={() => setDisplayData(fuelCosts.weeksSummery)}>
          Per Week{" "}
        </button>
        <button onClick={() => setDisplayData(fuelCosts.daysSummery)}>
          Per Day{" "}
        </button>
      </div>
      <div id="info">
        <p>
          <p className="head"> Average Fuel Consumption </p>
          <p className="content">{averageFuelConsumption}L/100km</p>
        </p>
        <p>
          <p className="head"> Fuel Cost </p>
          <p className="content"> $70.000</p>
        </p>
      </div>
      <ResponsiveContainer width={700}
        height={335}>

        <AreaChart

          data={displayData}
          margin={{
            top: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="uv" stroke="#4CAB9A" fill="#E2F1EF" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
export default FuelCosts;
