// frontend/src/config/mapbox.ts

// Mapbox configuration for RouteMatch application
import MapboxGL from '@react-native-mapbox-gl/maps';

// Set your Mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'YOUR_MAPBOX_ACCESS_TOKEN';

// Initialize Mapbox with the access token
MapboxGL.setAccessToken(MAPBOX_ACCESS_TOKEN);

// Export Mapbox configuration
export const mapboxConfig = {
  accessToken: MAPBOX_ACCESS_TOKEN,
  styleURL: MapboxGL.StyleURL.Street, // You can change the style as needed
};

// Export MapboxGL for use in components
export default MapboxGL;