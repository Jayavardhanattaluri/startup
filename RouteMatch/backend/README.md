# RouteMatch Backend Documentation

## Overview
RouteMatch is a ride-sharing application that connects riders with drivers in real-time. This backend service is built using Node.js and Express, providing a robust API for managing rides, user authentication, and real-time communication through WebSockets.

## Features
- **API for Ride Management**: Create, fetch, and manage ride requests.
- **Real-time Communication**: WebSocket support for real-time updates between riders and drivers.
- **Firebase Integration**: Secure user authentication using Firebase.
- **Mapbox Integration**: Utilize Mapbox services for location tracking and mapping.

## Project Structure
The backend project is organized as follows:

```
backend
├── src
│   ├── api                # API routes
│   │   └── index.ts      # Main API entry point
│   ├── models             # Data models
│   │   └── Ride.ts       # Ride model definition
│   ├── controllers        # Request handlers
│   │   └── RideController.ts # Controller for ride-related requests
│   ├── matchingEngine     # Logic for matching riders with drivers
│   │   └── index.ts      # Matching engine implementation
│   ├── websocket          # WebSocket handlers
│   │   └── handler.ts     # WebSocket connection management
│   ├── config             # Configuration files
│   │   ├── firebase.ts    # Firebase configuration
│   │   └── mapbox.ts      # Mapbox configuration
│   └── app.ts            # Main application entry point
├── package.json           # Backend dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Backend documentation
```

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd RouteMatch/backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

### Running the Application
To start the backend server, run:
```
npm start
```

The server will be running on `http://localhost:5000` by default.

### API Documentation
Refer to the `api/index.ts` file for available endpoints and their usage.

### WebSocket Communication
WebSocket connections are managed in the `websocket/handler.ts` file. Ensure that clients connect to the correct WebSocket endpoint for real-time updates.

### Firebase and Mapbox Configuration
Configuration files for Firebase and Mapbox are located in the `config` directory. Ensure to replace placeholder values with your actual API keys and configuration settings.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.