"use strict";

import express from "express";
import vehiclesSchema from "../Model/schema.js";
const router = express.Router();

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
  const vehicleConsumptionMetersPerLiters = (vehicleKMConsumption / 20) * 1000;

  try {
    //   Save to database
    let saveToDB = await vehiclesSchema({
      vehicleStatus,
      vehicleCondition,
      monthlyMeters,
      weeklyMeters: perWeek,
      dailyMeters: perDay,
      vehicleConsumptionMetersPerLiters,
    }).save();

    // Response
    res.status(200).json({
      msg: "Vehicle Info added to the DB successfully",
      info: saveToDB,
    });
  } catch (e) {
    res.send("Error in sending data");
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
    send("Something went wrong");
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
    send("Something went wrong");
    console.error(e);
  }
});

// Get all vehicles' meter/liter info
router.get("/vehicle-meter-liter", async (req, res) => {
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

    res.status(200).json({ monthly: perMonth, weekly: perWeek, daily: perDay });
  } catch (e) {
    send("Something went wrong");
    console.error(e);
  }
});

export default router;
