import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import { MapMarker } from '../components';

// Mock data for nearby drivers
const mockDrivers = [
  { id: '1', coordinate: [-122.4194, 37.7749], name: 'Driver 1' },
  { id: '2', coordinate: [-122.4085, 37.7839], name: 'Driver 2' },
  { id: '3', coordinate: [-122.4312, 37.7880], name: 'Driver 3' },
];

interface Location {
  latitude: number;
  longitude: number;
}

const HomeScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [nearbyDrivers] = useState(mockDrivers);
  const mapRef = useRef<MapboxGL.MapView>(null);
  const cameraRef = useRef<MapboxGL.Camera>(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'RouteMatch needs access to your location to find nearby rides.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        // Center map on user location
        if (cameraRef.current) {
          cameraRef.current.setCamera({
            centerCoordinate: [longitude, latitude],
            zoomLevel: 14,
          });
        }
      },
      (error) => {
        console.log(error.code, error.message);
        // Fallback to San Francisco coordinates
        setUserLocation({ latitude: 37.7749, longitude: -122.4194 });
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const handleFindRide = () => {
    if (!searchText.trim()) {
      Alert.alert('Error', 'Please enter a destination');
      return;
    }
    Alert.alert('Find Ride', `Searching for rides to: ${searchText}`);
    // TODO: Implement ride search logic
  };

  const handleOfferRide = () => {
    Alert.alert('Offer Ride', 'Navigate to offer ride screen');
    // TODO: Navigate to offer ride screen
  };

  const handleDailyRoute = () => {
    Alert.alert('Daily Route', 'Navigate to daily route screen');
    // TODO: Navigate to daily route screen
  };

  const handleMarkerPress = (driver: typeof mockDrivers[0]) => {
    Alert.alert('Driver Info', `Driver: ${driver.name}\nTap to request ride`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search destination"
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.findRideButton]} onPress={handleFindRide}>
          <Text style={styles.buttonText}>Find Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.offerRideButton]} onPress={handleOfferRide}>
          <Text style={styles.buttonText}>Offer Ride</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.dailyRouteButton]} onPress={handleDailyRoute}>
          <Text style={styles.buttonText}>Daily Route</Text>
        </TouchableOpacity>
      </View>

      {/* Map View */}
      <View style={styles.mapContainer}>
        <MapboxGL.MapView
          ref={mapRef}
          style={styles.map}
          styleURL={MapboxGL.StyleURL.Street}
          compassEnabled={true}
          compassViewPosition={3}
        >
          <MapboxGL.Camera
            ref={cameraRef}
            centerCoordinate={userLocation ? [userLocation.longitude, userLocation.latitude] : [-122.4194, 37.7749]}
            zoomLevel={14}
          />

          {/* User Location Marker */}
          {userLocation && (
            <MapMarker
              id="user-location"
              coordinate={[userLocation.longitude, userLocation.latitude]}
              type="rider"
              title="Your Location"
            />
          )}

          {/* Nearby Drivers Markers */}
          {nearbyDrivers.map((driver) => (
            <MapMarker
              key={driver.id}
              id={driver.id}
              coordinate={driver.coordinate}
              type="driver"
              title={driver.name}
              description="Available driver"
              onPress={() => handleMarkerPress(driver)}
            />
          ))}
        </MapboxGL.MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  searchInput: {
    height: 44,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  buttonContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  findRideButton: {
    backgroundColor: '#3B82F6', // Blue
  },
  offerRideButton: {
    backgroundColor: '#10B981', // Green
  },
  dailyRouteButton: {
    backgroundColor: '#F59E0B', // Yellow
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default HomeScreen;
