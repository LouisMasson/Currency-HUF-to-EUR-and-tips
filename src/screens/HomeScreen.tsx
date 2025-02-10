import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { CurrencyConverter } from '../components/CurrencyConverter.native';
import { TipCalculator } from '../components/TipCalculator.native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'converter' | 'tip'>('converter');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'converter' && styles.activeTab]}
          onPress={() => setActiveTab('converter')}
        >
          <Text style={[styles.tabText, activeTab === 'converter' && styles.activeTabText]}>
            Converter
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tip' && styles.activeTab]}
          onPress={() => setActiveTab('tip')}
        >
          <Text style={[styles.tabText, activeTab === 'tip' && styles.activeTabText]}>
            Tip Calculator
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {activeTab === 'converter' ? <CurrencyConverter /> : <TipCalculator />}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#18181B', // Dark background
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 15,
    backgroundColor: '#27272A', // Slightly lighter dark
    borderRadius: 8,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#3F3F46', // Active tab background
  },
  tabText: {
    color: '#A1A1AA',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#27272A', // Content area background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
});