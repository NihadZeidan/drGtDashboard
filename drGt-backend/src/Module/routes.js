"use strict";

import express from "express";
import vehiclesSchema from "../Model/schema.js";
const router = express.Router();
import SummeryCalculator from "./summeryCalculator.js";

router.post("/add-vehicle", async (req, res) => {
  // Request the data from the header request (Body)
  const {
    vehicleStatus,
    vehicleCondition,
    monthlyMeters,
    vehicleKMConsumption,
  } = req.body;

  //   calculate the vehicle meters per liter for each week
  const perWeek = monthlyMeters.map((month) => {
    return month / 4;
  });

  //   calculate the vehicle meters per liter for each day
  const perDay = monthlyMeters.map((month, idx) => {
    //   This to calculate february days
    if (idx === 1) {
      return month / 28;
      //   This to calculate all the months with 31 days
    } else if ((idx + 1) % 2 !== 0) {
      return month / 31;
      //   This to calculate all the months with 30 days
    } else {
      return month / 30;
    }
  });

  // To transform from kilos/galen to meters/liters
  const vehicleConsumptionMetersPerLiter = (vehicleKMConsumption / 20) * 1000;

  try {
    //   Save to database
    let saveToDB = await vehiclesSchema({
      vehicleStatus,
      vehicleCondition,
      monthlyMeters,
      weeklyMeters: perWeek,
      dailyMeters: perDay,
      vehicleConsumptionMetersPerLiter,
    }).save();

    // Response
    res.status(200).json({
      msg: "Vehicle Info added to the DB successfully",
      info: saveToDB,
    });
  } catch (e) {
    res.send("Something went wrong in the server");
    console.error(e);
  }
});

// Get all vehicles' status from the Database
router.get("/vehicle-status", async (req, res) => {
  try {
    let allData = await vehiclesSchema.find();

    const vehiclesStatus = allData.map((eachCar) => {
      return eachCar.vehicleStatus;
    });

    res.status(200).json({ data: vehiclesStatus });
  } catch (e) {
    res.send("Something went wrong in the server");
    console.error(e);
  }
});

// Get all vehicles' condition from the Database
router.get("/vehicle-condition", async (req, res) => {
  try {
    let allData = await vehiclesSchema.find();

    const vehiclesCondition = allData.map((eachCar) => {
      return eachCar.vehicleCondition;
    });

    res.status(200).json({ data: vehiclesCondition });
  } catch (e) {
    res.send("Something went wrong in the server");
    console.error(e);
  }
});

// Get all vehicles' meter/liter info
router.get("/vehicle-fuel", async (req, res) => {
  try {
    let allData = await vehiclesSchema.find();

    // calculate per month, week and day
    const perMonth = allData.map((eachCar) => {
      return eachCar.monthlyMeters;
    });

    const perWeek = allData.map((eachCar) => {
      return eachCar.weeklyMeters;
    });
    const perDay = allData.map((eachCar) => {
      return eachCar.dailyMeters;
    });

    // Calculate all vehicles meters per month, week and day
    let monthsSummery = [
      { name: "Jan", uv: SummeryCalculator.Summery(perMonth)[0] },
      { name: "Feb", uv: SummeryCalculator.Summery(perMonth)[1] },
      { name: "Mar", uv: SummeryCalculator.Summery(perMonth)[2] },
      { name: "Apr", uv: SummeryCalculator.Summery(perMonth)[3] },
      { name: "May", uv: SummeryCalculator.Summery(perMonth)[4] },
      { name: "Jun", uv: SummeryCalculator.Summery(perMonth)[5] },
    ];

    // 4 weeks a month
    let weeksSummery = [
      { name: "1st week", uv: SummeryCalculator.Summery(perWeek)[0] },
      { name: "2nd week", uv: SummeryCalculator.Summery(perWeek)[1] },
      { name: "3rd week", uv: SummeryCalculator.Summery(perWeek)[2] },
      { name: "4th week", uv: SummeryCalculator.Summery(perWeek)[3] },
    ];

    // 30 days a month
    let daysSummery = [
      { name: "1", uv: SummeryCalculator.Summery(perDay)[0].toFixed(1) },
      { name: "2", uv: SummeryCalculator.Summery(perDay)[1].toFixed(1) },
      { name: "3", uv: SummeryCalculator.Summery(perDay)[2].toFixed(1) },
      { name: "4", uv: SummeryCalculator.Summery(perDay)[3].toFixed(1) },
      { name: "5", uv: SummeryCalculator.Summery(perDay)[4].toFixed(1) },
      { name: "6", uv: SummeryCalculator.Summery(perDay)[5].toFixed(1) },
      { name: "7", uv: SummeryCalculator.Summery(perDay)[0].toFixed(1) },
      { name: "8", uv: SummeryCalculator.Summery(perDay)[1].toFixed(1) },
      { name: "9", uv: SummeryCalculator.Summery(perDay)[2].toFixed(1) },
      { name: "10", uv: SummeryCalculator.Summery(perDay)[3].toFixed(1) },
      { name: "11", uv: SummeryCalculator.Summery(perDay)[4].toFixed(1) },
      { name: "12", uv: SummeryCalculator.Summery(perDay)[5].toFixed(1) },
      { name: "13", uv: SummeryCalculator.Summery(perDay)[5].toFixed(1) },
      { name: "14", uv: SummeryCalculator.Summery(perDay)[5].toFixed(1) },
      { name: "15", uv: SummeryCalculator.Summery(perDay)[0].toFixed(1) },
      { name: "16", uv: SummeryCalculator.Summery(perDay)[1].toFixed(1) },
      { name: "17", uv: SummeryCalculator.Summery(perDay)[2].toFixed(1) },
      { name: "18", uv: SummeryCalculator.Summery(perDay)[3].toFixed(1) },
      { name: "19", uv: SummeryCalculator.Summery(perDay)[4].toFixed(1) },
      { name: "20", uv: SummeryCalculator.Summery(perDay)[5].toFixed(1) },
      { name: "21", uv: SummeryCalculator.Summery(perDay)[5].toFixed(1) },
      { name: "22", uv: SummeryCalculator.Summery(perDay)[4].toFixed(1) },
      { name: "23", uv: SummeryCalculator.Summery(perDay)[3].toFixed(1) },
      { name: "24", uv: SummeryCalculator.Summery(perDay)[2].toFixed(1) },
      { name: "25", uv: SummeryCalculator.Summery(perDay)[1].toFixed(1) },
      { name: "26", uv: SummeryCalculator.Summery(perDay)[0].toFixed(1) },
      { name: "27", uv: SummeryCalculator.Summery(perDay)[2].toFixed(1) },
      { name: "28", uv: SummeryCalculator.Summery(perDay)[2].toFixed(1) },
      { name: "29", uv: SummeryCalculator.Summery(perDay)[3].toFixed(1) },
      { name: "30", uv: SummeryCalculator.Summery(perDay)[5].toFixed(1) },
    ];

    // Calculate all vehicles consumption meters/liter
    let allCarsConsumptionMetersPerLiter = allData.reduce((prev, current) => {
      return (prev += current.vehicleConsumptionMetersPerLiter);
    }, 0);

    res.status(200).json({
      monthsSummery,
      weeksSummery,
      daysSummery,
      allCarsConsumptionMetersPerLiter,
    });
  } catch (e) {
    res.send("Something went wrong in the server");
    console.error(e);
  }
});

export default router;
