import { useEffect, useContext } from "react";
import "../Styles/vehicleStatues.scss";
import { myContext } from "../context/context";
import superAgent from "superagent";

function VehiclesStatus() {
  const { vehicleStatus, setVehicleStatus } = useContext(myContext);

  //   When component did mount get all vehicles state from the backend
  useEffect(() => {
    superAgent
      .get("http://localhost:3050/vehicle-status")
      .then((result) => {
        // Count each state
        let active = 0;
        let inActive = 0;
        let inShop = 0;
        result.body.data.forEach((state) => {
          if (state === "Active") {
            active++;
          } else if (state === "Inactive") {
            inActive++;
          } else {
            inShop++;
          }
        });
        // update my global state
        setVehicleStatus({ active, inActive, inShop });
      })
      .catch((e) => console.error(e));
  }, []);

  //   Display
  return (
    <div id="container">
      <p className="title">Vehicle Status</p>
      <button className="btn">Details ></button>
      <div className="subContainer">
        <p>Active</p> <p id="activeCount">{vehicleStatus.active}</p>
      </div>
      <div className="inactiveContainer">
        <p>Inactive</p> <p id="inactiveCount">{vehicleStatus.inActive}</p>
      </div>
      <div className="subContainer">
        <p> In Shop</p> <p id="inShopCount">{vehicleStatus.inShop}</p>
      </div>
    </div>
  );
}

export default VehiclesStatus;
