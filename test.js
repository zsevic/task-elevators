const assert = require('assert').strict;
const { describe, it } = require('node:test');
const { Building } = require('./building');
const { STATUS } = require('./constants');

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

  it('should handle multiple requests correctly with multiple elevators', () => {
    const building = new Building(3, 10);

    const elevator1 = building.callElevator(1, 5);
    const elevator2 = building.callElevator(2, 6);
    const elevator3 = building.callElevator(3, 7);

    for (let i = 0; i < 10; i++) {
      building.elevators.forEach((elevator) => elevator.move());
    }

    building.elevators.forEach((elevator) => {
      if (elevator === elevator1) {
        assert.equal(
          elevator.requests.some(
            (req) => req.origin === 1 && req.destination === 5
          ),
          false
        );
      } else if (elevator === elevator2) {
        assert.equal(
          elevator.requests.some(
            (req) => req.origin === 2 && req.destination === 6
          ),
          false
        );
      } else if (elevator === elevator3) {
        assert.equal(
          elevator.requests.some(
            (req) => req.origin === 3 && req.destination === 7
          ),
          false
        );
      }
    });

    building.callElevator(4, 2);
    building.callElevator(5, 3);

    for (let i = 0; i < 10; i++) {
      building.elevators.forEach((elevator) => elevator.move());
    }

    assert.equal(
      building.elevators.some((elevator) =>
        elevator.requests.some(
          (req) => req.origin === 4 && req.destination === 2
        )
      ),
      false
    );
    assert.equal(
      building.elevators.some((elevator) =>
        elevator.requests.some(
          (req) => req.origin === 5 && req.destination === 3
        )
      ),
      false
    );
  });
});
