const { DIRECTION, STATUS } = require('./constants');

class Elevator {
  constructor(id) {
    this.id = id;
    this.currentFloor = 0;
    this.direction = DIRECTION.idle;
    this.status = STATUS.idle;
    this.stops = [];
  }

  move() {
    if (this.direction === DIRECTION.up) {
      this.currentFloor++;
    } else if (this.direction === DIRECTION.down) {
      this.currentFloor--;
    }

    if (this.stops.includes(this.currentFloor)) {
      this.stops = this.stops.filter((floor) => floor !== this.currentFloor);
      if (this.stops.length === 0) {
        this.direction = DIRECTION.idle;
        this.status = STATUS.idle;
      }
    }
  }

  addStop(floor) {
    this.stops.push(floor);
    if (this.currentFloor < floor) {
      this.direction = DIRECTION.up;
      this.status = STATUS.moving;
    } else if (this.currentFloor > floor) {
      this.direction = DIRECTION.down;
      this.status = STATUS.moving;
    }
  }

  updateStatus() {
    if (this.stops.length === 0) {
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
