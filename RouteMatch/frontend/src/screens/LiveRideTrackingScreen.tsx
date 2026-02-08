import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Card } from '../components';
import colors from '../theme/colors';

const LiveRideTrackingScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Card>
        <Text style={styles.title}>Route progress</Text>
        <View style={styles.progressBar}>
          <View style={styles.progressFill} />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Time remaining</Text>
          <Text style={styles.value}>12 min</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Next stop</Text>
          <Text style={styles.value}>DLF Phase 2</Text>
        </View>
      </Card>

      <Card>
        <Text style={styles.sectionTitle}>Safety & sharing</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Auto-safety monitor</Text>
          <Text style={styles.value}>Active</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Live location</Text>
          <Text style={styles.value}>Shared with 2 contacts</Text>
        </View>
      </Card>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.sosButton}>
          <Text style={styles.sosText}>SOS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Share Live Location</Text>
        </TouchableOpacity>
      </View>
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
    fontSize: 16,
    fontWeight: '700',
    color: colors.darkSlate,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 999,
    marginBottom: 12,
  },
  progressFill: {
    width: '65%',
    height: '100%',
    backgroundColor: colors.electricBlue,
    borderRadius: 999,
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
  buttonRow: {
    marginTop: 8,
  },
  sosButton: {
    backgroundColor: colors.danger,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  sosText: {
    color: colors.white,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: colors.white,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  secondaryButtonText: {
    color: colors.darkSlate,
    fontWeight: '600',
  },
});

export default LiveRideTrackingScreen;
