"use strict";

// Creating express server
import express from "express";
import cors from "cors";
import router from "./Module/routes.js";
const app = express();

// Using middleWares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Endpoints
app.use(router);

// starting function
function start(port) {
  app.listen(port, () => {
    console.log("Listening on port ", port);
  });
}

export default start;
