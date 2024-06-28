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
    const originRequests = this.requests.filter(
      (request) =>
        request.origin === this.currentFloor && !request.originVisited
    );
    if (originRequests.length > 0) {
      originRequests.forEach((request) => (request.originVisited = true));
    }

    const destinationRequests = this.requests.filter(
      (request) =>
        request.destination === this.currentFloor && request.originVisited
    );
    if (destinationRequests.length > 0) {
      this.requests = this.requests.filter(
        (request) =>
          !(request.destination === this.currentFloor && request.originVisited)
      );
    }

    if (this.requests.length === 0) {
      this.direction = DIRECTION.idle;
      this.status = STATUS.idle;
    } else {
      const [nextRequest] = this.requests;

      const targetFloor = !nextRequest.originVisited
        ? nextRequest.origin
        : nextRequest.destination;
      if (this.currentFloor < targetFloor) {
        this.direction = DIRECTION.up;
      } else if (this.currentFloor > targetFloor) {
        this.direction = DIRECTION.down;
      }
    }

    if (this.direction === DIRECTION.up) {
      this.currentFloor++;
    } else if (this.direction === DIRECTION.down) {
      this.currentFloor--;
    }
  }

  addStop(origin, destination) {
    this.requests.push({ origin, destination, originVisited: false });

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
