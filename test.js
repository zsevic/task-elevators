const assert = require('assert').strict;
const { describe, it } = require('node:test');
const { Building } = require('./building');
const { STATUS } = require('./constants');

describe('Elevator System', function () {
  it('should initialize elevators on the ground floor', function () {
    const building = new Building(3, 10);

    building.initializeElevators();

    building.elevators.forEach((elevator) => {
      assert.equal(elevator.currentFloor, 0);
      assert.equal(elevator.status, STATUS.idle);
    });
  });

  it('should assign the nearest idle elevator', function () {
    const building = new Building(3, 10);
    building.initializeElevators();

    const elevator = building.callElevator(3, 7);

    assert.equal(elevator.stops.includes(3), true);
    assert.equal(elevator.stops.includes(7), true);
  });
});
