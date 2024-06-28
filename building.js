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

  callElevator(originFloor, destinationFloor) {
    let bestElevator = null;
    let minDistance = this.numFloors + 1;

    for (const elevator of this.elevators) {
      const distance = Math.abs(elevator.currentFloor - originFloor);
      if (elevator.status === STATUS.idle && distance < minDistance) {
        bestElevator = elevator;
        minDistance = distance;
      } else if (
        elevator.direction === DIRECTION.up &&
        originFloor >= elevator.currentFloor &&
        distance < minDistance
      ) {
        bestElevator = elevator;
        minDistance = distance;
      } else if (
        elevator.direction === DIRECTION.down &&
        originFloor <= elevator.currentFloor &&
        distance < minDistance
      ) {
        bestElevator = elevator;
        minDistance = distance;
      }
    }

    if (bestElevator) {
      bestElevator.addStop(originFloor, destinationFloor);
      bestElevator.updateStatus();
    }

    return bestElevator;
  }

  randomPassenger() {
    const originFloor = Math.floor(Math.random() * this.numFloors);
    let destinationFloor;
    // get different value compared to origin floor
    do {
      destinationFloor = Math.floor(Math.random() * this.numFloors);
    } while (destinationFloor === originFloor);
    console.log(
      `Adding passenger with origin floor: ${originFloor} and destination floor: ${destinationFloor}`
    );
    this.callElevator(originFloor, destinationFloor);
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
