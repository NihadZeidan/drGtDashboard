import { useEffect, useContext } from "react";
import { myContext } from "../context/context";
import chartOptions from "./chartOptions.js";
import superAgent from "superagent";
import ReactApexChart from "react-apexcharts";
import "../Styles/vehiclesCondition.scss";

function VehicleConditions() {
  const { vehiclesCondition, setVehiclesCondition } = useContext(myContext);

  //   When component did mount update my global state from the back-end
  useEffect(() => {
    superAgent
      .get("http://localhost:3050/vehicle-condition")
      .then((result) => {
        // Count each condition
        let good = 0;
        let satisfactory = 0;
        let critical = 0;
        result.body.data.forEach((condition) => {
          if (condition === "Good") {
            good++;
          } else if (condition === "Satisfactory") {
            satisfactory++;
          } else {
            critical++;
          }
        });
        // find the total numbers of vehicles
        let totalVehicles = result.body.data.length;
        // update my global state
        setVehiclesCondition({ good, satisfactory, critical, totalVehicles });
      })
      .catch((e) => console.error(e));
  }, []);

  //   Chart data
  let seriesGood = [
    Math.trunc(
      (vehiclesCondition.good / vehiclesCondition.totalVehicles) * 100
    ),
  ];

  let seriesSatisfactory = [
    Math.trunc(
      (vehiclesCondition.satisfactory / vehiclesCondition.totalVehicles) * 100
    ),
  ];

  let seriesCritical = [
    Math.trunc(
      (vehiclesCondition.critical / vehiclesCondition.totalVehicles) * 100
    ),
  ];

  //   Chart options
  let goodOptions = {
    fill: {
      colors: ["#37BC7F"],
    },

    ...chartOptions,
  };

  let satisfactoryOptions = {
    fill: {
      colors: ["#FFBD56"],
    },

    ...chartOptions,
  };

  let criticalOptions = {
    fill: {
      colors: ["#EF6353"],
    },

    ...chartOptions,
  };

  return (
    <div id="mainContainer">
      <p className="mainTitle"> Vehicles Condition </p>
      <div id="coniditonsContainer">
        <div id="goodContainer">
          <p className="Title"> Good</p>
          <ReactApexChart
            options={goodOptions}
            type="radialBar"
            width="60%"
            height="220"
            series={seriesGood}
          />

          <div className="count">
            {vehiclesCondition.good}
            <br /> <p>Vehicles </p>
          </div>
        </div>
        <div id="satisfactoryContainer">
          <p className="Title"> Satisfactory</p>
          <ReactApexChart
            options={satisfactoryOptions}
            type="radialBar"
            width="60%"
            height="220"
            series={seriesSatisfactory}
          />
          <div className="count">
            {vehiclesCondition.satisfactory} <br /> <p>Vehicles </p>
          </div>
        </div>
        <div id="criticalContainer">
          <p className="Title"> Critical</p>
          <ReactApexChart
            options={criticalOptions}
            type="radialBar"
            width="60%"
            height="220"
            series={seriesCritical}
          />
          <div className="count">
            {vehiclesCondition.critical} <br /> <p>Vehicles </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleConditions;
