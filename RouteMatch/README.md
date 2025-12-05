# RouteMatch Project

RouteMatch is a ride-sharing application built with React Native for the frontend and Node.js with Express for the backend. This project aims to provide a seamless experience for users looking to book rides and for drivers to manage their ride requests.

## Project Structure

The project is organized into two main directories: `frontend` and `backend`.

### Frontend

The frontend is developed using React Native and includes the following key components:

- **components/**: Contains reusable UI components such as buttons, headers, and cards.
- **screens/**: Contains the main screens of the application, including the HomeScreen.
- **services/**: Contains services for interacting with the backend API.
- **hooks/**: Contains custom hooks for managing application state, such as authentication.
- **config/**: Contains configuration files for Firebase and Mapbox.
- **App.tsx**: The main entry point of the React Native application.

### Backend

The backend is developed using Node.js and Express, structured as follows:

- **api/**: Contains the API routes for managing rides.
- **models/**: Contains the data models, including the Ride model.
- **controllers/**: Contains the controllers that handle requests and responses for ride management.
- **matchingEngine/**: Implements the logic for matching riders with drivers.
- **websocket/**: Manages real-time communication through WebSocket connections.
- **config/**: Contains configuration files for Firebase and Mapbox.
- **app.ts**: The main entry point of the backend application.

## Features

- **User Authentication**: Users can log in using OTP via Firebase.
- **Ride Management**: Users can request rides, and drivers can accept them.
- **Real-time Updates**: WebSocket integration allows for real-time communication between users and drivers.
- **Map Integration**: Mapbox is used for displaying maps and locations.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- React Native development environment
- Firebase account
- Mapbox account

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the frontend directory and install dependencies:
   ```
   cd frontend
   npm install
   ```

3. Navigate to the backend directory and install dependencies:
   ```
   cd backend
   npm install
   ```

### Running the Application

- To start the frontend:
  ```
  cd frontend
  npm start
  ```

- To start the backend:
  ```
  cd backend
  npm start
  ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License

This project is licensed under the MIT License. See the LICENSE file for details.