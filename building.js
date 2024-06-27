const { STATUS, DIRECTION } = require('./constants');
const { Elevator } = require('./elevator');

class Building {
  constructor(numElevators, numFloors) {
    this.elevators = [];
    this.numFloors = numFloors;
    for (let i = 0; i < numElevators; i++) {
      this.elevators.push(new Elevator(i));
    }
  }

  callElevator(requestFloor, targetFloor) {
    let bestElevator = null;
    let minDistance = this.numFloors + 1;

    for (const elevator of this.elevators) {
      const distance = Math.abs(elevator.currentFloor - requestFloor);
      if (elevator.status === STATUS.idle && distance < minDistance) {
        bestElevator = elevator;
        minDistance = distance;
      } else if (
        elevator.direction === DIRECTION.up &&
        requestFloor >= elevator.currentFloor &&
        distance < minDistance
      ) {
        bestElevator = elevator;
        minDistance = distance;
      } else if (
        elevator.direction === DIRECTION.down &&
        requestFloor <= elevator.currentFloor &&
        distance < minDistance
      ) {
        bestElevator = elevator;
        minDistance = distance;
      }
    }

    if (bestElevator) {
      bestElevator.addStop(requestFloor);
      bestElevator.addStop(targetFloor);
      bestElevator.updateStatus();
    }

    return bestElevator;
  }

  initializeElevators() {
    this.elevators.forEach((elevator) => {
      elevator.currentFloor = 0;
      elevator.direction = DIRECTION.idle;
      elevator.status = STATUS.idle;
      elevator.stops = [];
    });
  }

  randomPassenger() {
    const requestFloor = Math.floor(Math.random() * this.numFloors);
    const targetFloor = Math.floor(Math.random() * this.numFloors);
    this.callElevator(requestFloor, targetFloor);
  }

  displayStatus() {
    this.elevators.forEach((elevator) => {
      console.log(
        `Elevator ${elevator.id}: Floor ${elevator.currentFloor}, Direction ${
          elevator.direction
        }, Status ${elevator.status}, Stops: ${elevator.stops.join(', ')}`
      );
    });
  }
}

module.exports = {
  Building,
};
