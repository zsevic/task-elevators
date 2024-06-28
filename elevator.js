const { DIRECTION, STATUS } = require('./constants');

class Elevator {
  constructor(id) {
    this.id = id;
    this.currentFloor = 0;
    this.direction = DIRECTION.idle;
    this.status = STATUS.idle;
    this.requests = [];
  }

  move() {
    if (this.direction === DIRECTION.up) {
      this.currentFloor++;
    } else if (this.direction === DIRECTION.down) {
      this.currentFloor--;
    }

    const stopRequests = this.requests.filter(
      (request) => request.destination === this.currentFloor
    );
    if (stopRequests.length > 0) {
      this.requests = this.requests.filter(
        (request) => request.destination !== this.currentFloor
      );
      if (this.requests.length === 0) {
        this.direction = DIRECTION.idle;
        this.status = STATUS.idle;
      }
    }

    if (this.requests.length > 0) {
      const nextRequest = this.requests[0];
      if (this.currentFloor < nextRequest.destination) {
        this.direction = DIRECTION.up;
      } else if (this.currentFloor > nextRequest.destination) {
        this.direction = DIRECTION.down;
      }
    }
  }

  addStop(origin, destination) {
    this.requests.push({ origin, destination });

    if (this.status === STATUS.idle) {
      if (this.currentFloor < origin) {
        this.direction = DIRECTION.up;
      } else if (this.currentFloor > origin) {
        this.direction = DIRECTION.down;
      } else {
        if (this.currentFloor < destination) {
          this.direction = DIRECTION.up;
        } else if (this.currentFloor > destination) {
          this.direction = DIRECTION.down;
        }
      }
      this.status = STATUS.moving;
    }
  }

  updateStatus() {
    if (this.requests.length === 0) {
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
