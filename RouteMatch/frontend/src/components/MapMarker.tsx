import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapboxGL from '@rnmapbox/maps';

interface MapMarkerProps {
  id: string;
  coordinate: [number, number];
  title?: string;
  description?: string;
  type?: 'driver' | 'rider' | 'pickup' | 'destination';
  onPress?: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({
  id,
  coordinate,
  title,
  description,
  type = 'driver',
  onPress,
}) => {
  const getMarkerColor = () => {
    switch (type) {
      case 'driver':
        return '#10B981';
      case 'rider':
        return '#3B82F6';
      case 'pickup':
        return '#F59E0B';
      case 'destination':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  const getMarkerIcon = () => {
    switch (type) {
      case 'driver':
        return '🚗';
      case 'rider':
        return '👤';
      case 'pickup':
        return '📍';
      case 'destination':
        return '🏁';
      default:
        return '📍';
    }
  };

  return (
    <MapboxGL.PointAnnotation
      id={id}
      coordinate={coordinate}
      title={title}
      snippet={description}
      onSelected={onPress}
    >
      <View style={[styles.markerContainer, { backgroundColor: getMarkerColor() }]}>
        <Text style={styles.markerIcon}>{getMarkerIcon()}</Text>
        <View style={[styles.markerPointer, { borderTopColor: getMarkerColor() }]} />
      </View>
    </MapboxGL.PointAnnotation>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markerIcon: {
    fontSize: 16,
  },
  markerPointer: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    marginLeft: -4,
    width: 0,
    height: 0,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default MapMarker;
