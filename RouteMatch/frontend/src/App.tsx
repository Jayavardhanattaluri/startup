import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DailyRouteScreen from './screens/DailyRouteScreen';
import FindRideScreen from './screens/FindRideScreen';
import HomeScreen from './screens/HomeScreen';
import LiveRideTrackingScreen from './screens/LiveRideTrackingScreen';
import MatchingScreen from './screens/MatchingScreen';
import OfferRideScreen from './screens/OfferRideScreen';
import SplashScreen from './screens/SplashScreen';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  FindRide: undefined;
  Matching: undefined;
  LiveRide: undefined;
  OfferRide: undefined;
  DailyRoute: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FindRide" component={FindRideScreen} options={{ title: 'Find Ride' }} />
        <Stack.Screen name="Matching" component={MatchingScreen} options={{ title: 'Route Match' }} />
        <Stack.Screen name="LiveRide" component={LiveRideTrackingScreen} options={{ title: 'Live Ride' }} />
        <Stack.Screen name="OfferRide" component={OfferRideScreen} options={{ title: 'Offer Ride' }} />
        <Stack.Screen name="DailyRoute" component={DailyRouteScreen} options={{ title: 'Daily Route' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
