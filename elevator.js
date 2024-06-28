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

    const originRequests = this.requests.filter(
      (request) => request.origin === this.currentFloor
    );
    if (originRequests.length > 0) {
      originRequests.forEach((request) => (request.origin = null));
    }

    const destinationRequests = this.requests.filter(
      (request) =>
        request.destination === this.currentFloor && request.origin === null
    );
    if (destinationRequests.length > 0) {
      this.requests = this.requests.filter(
        (request) =>
          !(
            request.destination === this.currentFloor && request.origin === null
          )
      );
    }

    if (this.requests.length === 0) {
      this.direction = DIRECTION.idle;
      this.status = STATUS.idle;
    } else {
      const nextRequest =
        this.requests.find((request) => request.origin !== null) ||
        this.requests[0];

      if (nextRequest && nextRequest.origin !== null) {
        if (this.currentFloor < nextRequest.origin) {
          this.direction = DIRECTION.up;
        } else if (this.currentFloor > nextRequest.origin) {
          this.direction = DIRECTION.down;
        }
      } else if (nextRequest) {
        if (this.currentFloor < nextRequest.destination) {
          this.direction = DIRECTION.up;
        } else if (this.currentFloor > nextRequest.destination) {
          this.direction = DIRECTION.down;
        }
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
