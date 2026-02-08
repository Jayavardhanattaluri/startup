import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card } from '../components';
import colors from '../theme/colors';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

const MatchingScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Driver passing nearby</Text>
      <Card>
        <View style={styles.row}>
          <Text style={styles.label}>Route intersection score</Text>
          <Text style={styles.value}>82% match</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Pickup walk distance</Text>
          <Text style={styles.value}>200 meters walk</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Detour for driver</Text>
          <Text style={styles.value}>0.3 km</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Driver snapshot</Text>
        <Text style={styles.driverName}>Aarav Singh · 4.9 ★</Text>
        <Text style={styles.driverMeta}>White Swift · Plate DL8CA1234</Text>
        <View style={styles.badgeRow}>
          <Text style={styles.badge}>Verified</Text>
          <Text style={styles.badge}>Community Driver</Text>
        </View>
      </Card>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('LiveRide')}
      >
        <Text style={styles.primaryButtonText}>Confirm Pickup</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.secondaryButtonText}>Back to Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.softGray,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.darkSlate,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    color: colors.slateMuted,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkSlate,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.darkSlate,
  },
  driverName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkSlate,
  },
  driverMeta: {
    fontSize: 12,
    color: colors.slateMuted,
    marginTop: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    marginTop: 12,
  },
  badge: {
    backgroundColor: '#E8F0FF',
    color: colors.electricBlue,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginRight: 8,
    fontSize: 12,
    fontWeight: '600',
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: colors.freshGreen,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
  secondaryButton: {
    marginTop: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: colors.slateMuted,
    fontWeight: '600',
  },
});

export default MatchingScreen;
