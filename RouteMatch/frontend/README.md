# RouteMatch Frontend Documentation

## Overview

RouteMatch is a ride-sharing application built using React Native for the frontend and Node.js with Express for the backend. This document provides an overview of the frontend structure, setup instructions, and usage guidelines.

## Project Structure

The frontend of RouteMatch is organized as follows:

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # Application screens
│   ├── services/          # API interaction services
│   ├── hooks/             # Custom React hooks
│   ├── config/            # Configuration files for Firebase and Mapbox
│   └── App.tsx            # Main entry point of the application
├── package.json           # Project dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # Frontend documentation
```

## Installation

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd RouteMatch/frontend
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

## Running the Application

To start the development server, run:

```
npm start
```

This will launch the application in development mode. You can then open it in your preferred simulator or device.

## Features

- **Authentication:** Users can log in using OTP via Firebase.
- **Map Integration:** The app utilizes Mapbox for displaying maps and ride options.
- **Real-time Updates:** The application supports real-time updates for ride requests and availability.

## Contributing

If you would like to contribute to RouteMatch, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Acknowledgments

- [React Native](https://reactnative.dev/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Firebase](https://firebase.google.com/)
- [Mapbox](https://www.mapbox.com/)