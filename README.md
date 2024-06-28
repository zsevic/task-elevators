# task-elevators

### Solution overview

The project simulates an elevator system within a building. The solution involves multiple elevators serving passengers by responding to calls from different floors and delivering them to their destinations. The system considers factors such as the proximity of elevators to the calling floor, the current direction of moving elevators, and their idle status to efficiently assign the best elevator for each request.

#### Key Features

- Elevator Management: Manages multiple elevators within a building, each with its own state (current floor, direction, status, and requests).
- Request Handling: Processes passenger requests by assigning the most suitable elevator based on proximity, direction, and idle status.
- Dynamic Movement: Elevators dynamically move between floors, picking up passengers at origin floors and delivering them to their destination floors.
- Simulation: Simulates random passenger requests, providing a realistic demonstration of the elevator system's functionality.

#### How It Works

- Initialization: Sets up the building with a specified number of floors and elevators.
- Request Assignment: Determines the best elevator for each passenger request by evaluating proximity, direction, and idle status.
- Elevator Movement: Elevators move to fulfill requests, updating their status and direction based on current and target floors.
- Handling Multiple Requests: Each elevator processes multiple requests in sequence, ensuring efficient and timely service.

By running the provided tests and simulation, you can observe the elevator system's behavior and validate its efficiency in handling passenger requests

### Prerequisites

- Node.js version 22 installed

### Setup

Run the following commands

```bash
git clone https://github.com/zsevic/task-elevators
cd task-elevators
```

#### Tests

Run the following command for unit tests

```bash
npm test
```

#### Simulation

Run the following command for simulation with random passengers

```bash
npm run simulation
```
