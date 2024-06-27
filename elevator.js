const { DIRECTION, STATUS } = require('./constants');

class Elevator {
  constructor(id) {
    this.id = id;
    this.currentFloor = 0;
    this.direction = DIRECTION.idle;
    this.status = STATUS.idle;
    this.stops = new Set();
  }

  move() {
    if (this.direction === DIRECTION.up) {
      this.currentFloor++;
    } else if (this.direction === DIRECTION.down) {
      this.currentFloor--;
    }

    if (this.stops.has(this.currentFloor)) {
      this.stops.delete(this.currentFloor);
      if (this.stops.size === 0) {
        this.direction = DIRECTION.idle;
        this.status = STATUS.idle;
      }
    }

    if (this.stops.size === 0) {
      this.direction = DIRECTION.idle;
      this.status = STATUS.idle;
    } else if (
      this.direction === DIRECTION.up &&
      Math.max(...this.stops) < this.currentFloor
    ) {
      this.direction = DIRECTION.down;
    } else if (
      this.direction === DIRECTION.down &&
      Math.min(...this.stops) > this.currentFloor
    ) {
      this.direction = DIRECTION.up;
    }
  }

  addStop(floor) {
    this.stops.add(floor);
    if (this.currentFloor < floor) {
      this.direction = DIRECTION.up;
      this.status = STATUS.moving;
    } else if (this.currentFloor > floor) {
      this.direction = DIRECTION.down;
      this.status = STATUS.moving;
    }
  }

  updateStatus() {
    if (this.stops.size === 0) {
      this.status = STATUS.idle;
      this.direction = DIRECTION.idle;
    } else {
      this.status = STATUS.moving;
    }
  }
}

module.exports = {
  Elevator,
};