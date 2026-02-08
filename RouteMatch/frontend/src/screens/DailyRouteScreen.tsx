import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card } from '../components';
import colors from '../theme/colors';

const DailyRouteScreen: React.FC = () => {
  const [time, setTime] = useState('');
  const [autoAccept, setAutoAccept] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.label}>Daily time</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 9:00 AM"
          value={time}
          onChangeText={setTime}
        />
        <View style={styles.toggleRow}>
          <View>
            <Text style={styles.toggleTitle}>Auto-accept riders on this route</Text>
            <Text style={styles.toggleSubtitle}>We match only high-trust profiles.</Text>
          </View>
          <TouchableOpacity
            style={[styles.toggleButton, autoAccept ? styles.toggleOn : styles.toggleOff]}
            onPress={() => setAutoAccept((prev) => !prev)}
          >
            <Text style={styles.toggleText}>{autoAccept ? 'On' : 'Off'}</Text>
          </TouchableOpacity>
        </View>
      </Card>

      <Card>
        <Text style={styles.label}>Subscription offer to riders</Text>
        <View style={styles.subscriptionRow}>
          <View>
            <Text style={styles.subscriptionTitle}>₹99 / month</Text>
            <Text style={styles.subscriptionSubtitle}>Daily commuter pass</Text>
          </View>
          <Text style={styles.subscriptionBadge}>Popular</Text>
        </View>
      </Card>

      <TouchableOpacity style={styles.primaryButton}>
        <Text style={styles.primaryButtonText}>Save daily route</Text>
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
    marginBottom: 16,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.darkSlate,
  },
  toggleSubtitle: {
    fontSize: 12,
    color: colors.slateMuted,
    marginTop: 4,
  },
  toggleButton: {
    width: 60,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: 'center',
  },
  toggleOn: {
    backgroundColor: colors.freshGreen,
  },
  toggleOff: {
    backgroundColor: '#E5E7EB',
  },
  toggleText: {
    color: colors.white,
    fontWeight: '600',
  },
  subscriptionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subscriptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkSlate,
  },
  subscriptionSubtitle: {
    fontSize: 12,
    color: colors.slateMuted,
    marginTop: 4,
  },
  subscriptionBadge: {
    backgroundColor: '#FEF3C7',
    color: colors.warning,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
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

export default DailyRouteScreen;
