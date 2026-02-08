import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card } from '../components';
import colors from '../theme/colors';

const OfferRideScreen: React.FC = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [time, setTime] = useState('');
  const [mode, setMode] = useState<'Fuel Split' | 'Earning'>('Fuel Split');

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.label}>From</Text>
        <TextInput
          style={styles.input}
          placeholder="Start location"
          value={from}
          onChangeText={setFrom}
        />
        <Text style={styles.label}>To</Text>
        <TextInput
          style={styles.input}
          placeholder="Destination"
          value={to}
          onChangeText={setTo}
        />
        <Text style={styles.label}>Time of travel</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 8:30 AM"
          value={time}
          onChangeText={setTime}
        />
      </Card>

      <Card>
        <Text style={styles.label}>Detour limit</Text>
        <View style={styles.limitRow}>
          {['0 km', '1 km', '2 km'].map((limit) => (
            <View key={limit} style={styles.limitBadge}>
              <Text style={styles.limitText}>{limit}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.label}>Mode</Text>
        <View style={styles.optionRow}>
          {(['Fuel Split', 'Earning'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, mode === option && styles.optionSelected]}
              onPress={() => setMode(option)}
            >
              <Text style={[styles.optionText, mode === option && styles.optionTextSelected]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Card>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Offer this ride</Text>
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
  limitRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  limitBadge: {
    backgroundColor: '#E8F0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    marginRight: 8,
  },
  limitText: {
    color: colors.electricBlue,
    fontSize: 12,
    fontWeight: '600',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    borderColor: colors.freshGreen,
    backgroundColor: '#ECFDF3',
  },
  optionText: {
    color: colors.slateMuted,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: colors.freshGreen,
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
});

export default OfferRideScreen;
