import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';

export type ExchangeRateResponse = {
  rate: number;
};

export function CurrencyConverter() {
  const [amount, setAmount] = useState('');
  const [direction, setDirection] = useState<'toEUR' | 'toHUF'>('toEUR');

  const { data: rateData, isLoading } = useQuery<ExchangeRateResponse>({
    queryKey: ['/api/exchange-rate'],
    refetchInterval: 1000 * 60 * 60, // Refresh every hour
  });

  const rate = rateData?.rate;

  const handleSwitch = () => {
    setDirection(prev => prev === 'toEUR' ? 'toHUF' : 'toEUR');
    setAmount('');
  };

  const convert = (value: string) => {
    if (!rate || !value) return '';
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '';

    if (direction === 'toEUR') {
      return (numValue / rate).toFixed(2);
    } else {
      return (numValue * rate).toFixed(2);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.rateText}>
        Current Rate: 1 EUR = {rate?.toFixed(2)} HUF
      </Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {direction === 'toEUR' ? 'HUF Amount' : 'EUR Amount'}
        </Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          placeholder="Enter amount"
          placeholderTextColor="#64748b"
        />
      </View>

      <TouchableOpacity style={styles.switchButton} onPress={handleSwitch}>
        <Text style={styles.switchButtonText}>Switch Direction</Text>
      </TouchableOpacity>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>
          {direction === 'toEUR' ? 'EUR Amount' : 'HUF Amount'}
        </Text>
        <TextInput
          style={[styles.input, styles.readOnlyInput]}
          value={convert(amount)}
          editable={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#4F46E5',
    backgroundColor: '#EEF2FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#374151',
  },
  readOnlyInput: {
    backgroundColor: '#F9FAFB',
  },
  switchButton: {
    backgroundColor: '#4F46E5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  switchButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});