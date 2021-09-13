"use strict";

class SummeryCalculator {
  constructor() {}

  // To calculate total meters for all cars
  Summery(allValues) {
    let total = new Map();

    for (let i = 0; i < allValues.length; i++) {
      total.set(
        0,
        total.get(0) ? total.get(0) + allValues[i][0] : allValues[i][0]
      );
      total.set(
        1,
        total.get(1) ? total.get(1) + allValues[i][1] : allValues[i][1]
      );
      total.set(
        2,
        total.get(2) ? total.get(2) + allValues[i][2] : allValues[i][2]
      );
      total.set(
        3,
        total.get(3) ? total.get(3) + allValues[i][3] : allValues[i][3]
      );
      total.set(
        4,
        total.get(4) ? total.get(4) + allValues[i][4] : allValues[i][4]
      );
      total.set(
        5,
        total.get(5) ? total.get(5) + allValues[i][5] : allValues[i][5]
      );
    }

    return [...total.values()];
  }
}

export default new SummeryCalculator();
