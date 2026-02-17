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
  ScrollView,
} from 'react-native';
import MapboxGL from '@rnmapbox/maps';
import Geolocation from 'react-native-geolocation-service';
import { MapMarker, Card } from '../components';
import colors from '../theme/colors';

// Mock data for nearby drivers
const mockDrivers: Array<{ id: string; coordinate: [number, number]; name: string }> = [
  { id: '1', coordinate: [-122.4194, 37.7749], name: 'Driver 1' },
  { id: '2', coordinate: [-122.4085, 37.7839], name: 'Driver 2' },
  { id: '3', coordinate: [-122.4312, 37.788], name: 'Driver 3' },
];

interface Location {
  latitude: number;
  longitude: number;
}

interface HomeScreenProps {
  navigation: { navigate: (routeName: string) => void };
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
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
    navigation.navigate('FindRide');
  };

  const handleOfferRide = () => {
    navigation.navigate('OfferRide');
  };

  const handleDailyRoute = () => {
    navigation.navigate('DailyRoute');
  };

  const handleMarkerPress = (driver: typeof mockDrivers[0]) => {
    Alert.alert('Driver Info', `Driver: ${driver.name}\nTap to request ride`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <Text style={styles.brandText}>ROUTEMATCH</Text>
          <Text style={styles.tagline}>Same route. Shared ride.</Text>
          <Text style={styles.subtleText}>Powered by AI Route Matching</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search destination"
            value={searchText}
            onChangeText={setSearchText}
            placeholderTextColor="#9CA3AF"
          />
        </View>

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

        <Card>
          <View style={styles.infoRow}>
            <View>
              <Text style={styles.infoTitle}>Route Match</Text>
              <Text style={styles.infoValue}>82% nearby</Text>
            </View>
            <View>
              <Text style={styles.infoTitle}>Avg. Savings</Text>
              <Text style={styles.infoValue}>35% lower</Text>
            </View>
            <View>
              <Text style={styles.infoTitle}>Pickup Walk</Text>
              <Text style={styles.infoValue}>200 m</Text>
            </View>
          </View>
        </Card>

        <Text style={styles.sectionTitle}>Nearby drivers</Text>
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

            {userLocation && (
              <MapMarker
                id="user-location"
                coordinate={[userLocation.longitude, userLocation.latitude]}
                type="rider"
                title="Your Location"
              />
            )}

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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softGray,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
  },
  brandText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.darkSlate,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.electricBlue,
    marginTop: 4,
  },
  subtleText: {
    fontSize: 12,
    color: colors.slateMuted,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
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
    backgroundColor: colors.electricBlue,
  },
  offerRideButton: {
    backgroundColor: colors.freshGreen,
  },
  dailyRouteButton: {
    backgroundColor: colors.warning,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoTitle: {
    fontSize: 12,
    color: colors.slateMuted,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkSlate,
    marginTop: 4,
  },
  sectionTitle: {
    paddingHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: '600',
    color: colors.darkSlate,
  },
  mapContainer: {
    height: 320,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  map: {
    flex: 1,
  },
});

export default HomeScreen;
