import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import colors from '../theme/colors';
import { RootStackParamList } from '../App';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigation.replace('Home');
    }, 1500);

    return () => clearTimeout(timeout);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>RM</Text>
        </View>
        <Text style={styles.brand}>ROUTEMATCH</Text>
        <Text style={styles.tagline}>Same route. Shared ride.</Text>
        <Text style={styles.subtitle}>Powered by AI Route Matching</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkSlate,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoBadge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.electricBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: {
    color: colors.white,
    fontSize: 28,
    fontWeight: '700',
  },
  brand: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.freshGreen,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 12,
    color: colors.softGray,
    marginTop: 6,
  },
});

export default SplashScreen;
