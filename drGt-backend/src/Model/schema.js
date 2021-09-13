"use strict";

import mongoose from "mongoose";

// Creating database schema
const vehiclesSchema = new mongoose.Schema({
  vehicleStatus: {
    type: String,
    enum: ["Active", "Inactive", "In Shop"],
    required: true,
  },
  vehicleCondition: {
    type: String,
    enum: ["Good", "Satisfactory", "Critical"],
    required: true,
  },
  monthlyMeters: { type: Array, required: true },
  weeklyMeters: { type: Array, required: true },
  dailyMeters: { type: Array, required: true },
  vehicleConsumptionMetersPerLiter: { type: Number, required: true },
});

// Wrapping and exporting the schema
export default mongoose.model("vehicleInfo", vehiclesSchema);
