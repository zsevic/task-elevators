const assert = require('assert').strict;
const { describe, it } = require('node:test');
const { Building } = require('../src/building');
const { STATUS } = require('../src/constants');

describe('Elevator System', function () {
  it('should initialize elevators on the ground floor', function () {
    const building = new Building(3, 10);

    building.elevators.forEach((elevator) => {
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.status, STATUS.idle);
    });
  });

  it('should assign the nearest idle elevator', function () {
    const building = new Building(3, 10);

    const elevator = building.callElevator(3, 7);

    assert.equal(
      elevator.requests.some(
        (req) => req.origin === 3 && req.destination === 7
      ),
      true
    );
  });

  it('should handle multiple requests correctly with multiple elevators', function () {
    const building = new Building(3, 10);

    let elevator1 = building.callElevator(1, 5);

    for (let i = 0; i < 5; i++) {
      building.elevators.forEach((elevator) => elevator.move());
    }

    assert.equal(elevator1.currentFloor, 5);
    assert.equal(elevator1.status, STATUS.moving);

    const elevator2 = building.callElevator(2, 9);
    elevator1 = building.callElevator(6, 3);

    for (let i = 0; i < 7; i++) {
      building.elevators.forEach((elevator) => elevator.move());
    }

    const elevator3 = building.callElevator(1, 3);
    for (let i = 0; i < 7; i++) {
      building.elevators.forEach((elevator) => elevator.move());
    }

    assert.equal(elevator1.currentFloor, 3);
    assert.equal(elevator1.status, STATUS.idle);
    assert.equal(elevator2.currentFloor, 9);
    assert.equal(elevator2.status, STATUS.idle);
    assert.equal(elevator3.currentFloor, 3);
    assert.equal(elevator3.status, STATUS.idle);
  });
});
