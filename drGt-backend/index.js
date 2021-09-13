"use strict";

import start from "./src/server.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// Application Environmental Variables
const DATABASE_URI = process.env.DATABASE_URI;
const PORT = process.env.PORT;

// Connecting to the Database then to the Server
mongoose.connect(DATABASE_URI, () => {
  console.log("Connected to DB");
  start(PORT);
});
