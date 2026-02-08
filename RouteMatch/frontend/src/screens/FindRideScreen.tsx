import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import colors from '../theme/colors';
import { Card } from '../components';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

const FindRideScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [vehicle, setVehicle] = useState<'Bike' | 'Car' | 'Scooter'>('Car');

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.label}>Pickup Point</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter pickup location"
          value={pickup}
          onChangeText={setPickup}
        />
        <Text style={styles.label}>Destination</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter destination"
          value={destination}
          onChangeText={setDestination}
        />
      </Card>

      <Card>
        <Text style={styles.label}>Choose Vehicle</Text>
        <View style={styles.optionRow}>
          {(['Bike', 'Car', 'Scooter'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, vehicle === option && styles.optionSelected]}
              onPress={() => setVehicle(option)}
            >
              <Text style={[styles.optionText, vehicle === option && styles.optionTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.estimateContainer}>
          <Text style={styles.estimateLabel}>Budget Estimate</Text>
          <Text style={styles.estimateValue}>35% lower than standard fares</Text>
        </View>
      </Card>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => navigation.navigate('Matching')}
      >
        <Text style={styles.primaryButtonText}>Find Route Match</Text>
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
  label: {
    fontSize: 12,
    color: colors.slateMuted,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: colors.white,
    marginBottom: 12,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  optionButton: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  optionSelected: {
    borderColor: colors.electricBlue,
    backgroundColor: '#E8F0FF',
  },
  optionText: {
    color: colors.slateMuted,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: colors.electricBlue,
  },
  estimateContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#ECFDF3',
    borderRadius: 8,
  },
  estimateLabel: {
    fontSize: 12,
    color: colors.slateMuted,
  },
  estimateValue: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkSlate,
  },
  primaryButton: {
    marginTop: 16,
    backgroundColor: colors.electricBlue,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '700',
  },
});

export default FindRideScreen;
