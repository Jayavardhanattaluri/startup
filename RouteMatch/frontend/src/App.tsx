import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import DailyRouteScreen from './screens/DailyRouteScreen';
import FindRideScreen from './screens/FindRideScreen';
import HomeScreen from './screens/HomeScreen';
import LiveRideTrackingScreen from './screens/LiveRideTrackingScreen';
import MatchingScreen from './screens/MatchingScreen';
import OfferRideScreen from './screens/OfferRideScreen';
import SplashScreen from './screens/SplashScreen';

const AppNavigator = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Home: HomeScreen,
    FindRide: FindRideScreen,
    Matching: MatchingScreen,
    LiveRide: LiveRideTrackingScreen,
    OfferRide: OfferRideScreen,
    DailyRoute: DailyRouteScreen,
  },
  {
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(AppNavigator);
