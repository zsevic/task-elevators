const { STATUS, DIRECTION } = require('./constants');
const { Elevator } = require('./elevator');

class Building {
  constructor(numElevators, numFloors) {
    this.elevators = Array.from(
      { length: numElevators },
      (_, i) => new Elevator(i)
    );
    this.numFloors = numFloors;
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
      bestElevator.addStop(requestFloor, targetFloor);
      bestElevator.updateStatus();
    }

    return bestElevator;
  }

  randomPassenger() {
    const requestFloor = Math.floor(Math.random() * this.numFloors);
    let targetFloor;
    // get different value compared to request floor
    do {
      targetFloor = Math.floor(Math.random() * this.numFloors);
    } while (targetFloor === requestFloor);
    console.log(
      `Adding passenger with request floor: ${requestFloor} and target floor: ${targetFloor}`
    );
    this.callElevator(requestFloor, targetFloor);
  }

  displayStatus() {
    this.elevators.forEach((elevator) => {
      const requests = elevator.requests
        .map((request) => `${request.origin}->${request.destination}`)
        .join(', ');

      console.log(
        `Elevator ${elevator.id}: Floor ${elevator.currentFloor}, Direction ${elevator.direction}, Status ${elevator.status}, Requests: ${requests}`
      );
    });
  }
}

module.exports = {
  Building,
};
