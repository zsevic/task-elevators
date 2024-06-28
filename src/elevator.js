const { DIRECTION, STATUS } = require('./constants');

class Elevator {
  /**
   * @param {number} id
   */
  constructor(id) {
    this.id = id;
    this.currentFloor = 0;
    this.direction = DIRECTION.idle;
    this.status = STATUS.idle;
    this.requests = [];
  }

  move() {
    // Filter requests where the current floor matches the origin and the origin has not been visited
    const originRequests = this.requests.filter(
      (request) =>
        request.origin === this.currentFloor && !request.originVisited
    );
    // Mark these origin requests as visited
    if (originRequests.length > 0) {
      originRequests.forEach((request) => (request.originVisited = true));
    }

    // Filter requests where the current floor matches the destination and the origin has been visited
    const destinationRequests = this.requests.filter(
      (request) =>
        request.destination === this.currentFloor && request.originVisited
    );
    // Remove requests that have reached their destination
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

      // Set the direction based on the target floor
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

  /**
   * @param {number} origin
   * @param {number} destination
   */
  addStop(origin, destination) {
    this.requests.push({ origin, destination, originVisited: false });

    if (this.status !== STATUS.idle) return;

    this.status = STATUS.moving;
    // Determine the direction based on the current floor and the origin of the new request
    if (this.currentFloor < origin) {
      this.direction = DIRECTION.up;
    } else if (this.currentFloor > origin) {
      this.direction = DIRECTION.down;
    }
    // If the elevator is already at the origin floor, determine the direction based on the destination
    else if (this.currentFloor < destination) {
      this.direction = DIRECTION.up;
    } else if (this.currentFloor > destination) {
      this.direction = DIRECTION.down;
    }
  }

  updateStatus() {
    if (this.requests.length !== 0) {
      this.status = STATUS.moving;
      return;
    }

    this.status = STATUS.idle;
    this.direction = DIRECTION.idle;
  }
}

module.exports = {
  Elevator,
};
