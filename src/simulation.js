const { Building } = require('./building');

const building = new Building(3, 10); // 3 elevators, 10 floors

setInterval(() => {
  building.randomPassenger();
  building.elevators.forEach((elevator) => elevator.move());
  building.displayStatus();
}, 5000);
