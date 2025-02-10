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
import type { ExchangeRateResponse } from './CurrencyConverter.native';

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('10');

  const { data: rateData, isLoading } = useQuery<ExchangeRateResponse>({
    queryKey: ['/api/exchange-rate'],
    refetchInterval: 1000 * 60 * 60, // Refresh every hour
  });

  const rate = rateData?.rate;

  const calculateTip = () => {
    if (!billAmount) return { huf: '0', eur: '0' };
    const amount = parseFloat(billAmount);
    if (isNaN(amount)) return { huf: '0', eur: '0' };
    const tipHuf = (amount * parseInt(tipPercentage)) / 100;
    const tipEur = rate ? tipHuf / rate : 0;
    return {
      huf: Math.round(tipHuf).toLocaleString('hu-HU'),
      eur: tipEur.toFixed(2)
    };
  };

  const calculateTotal = () => {
    if (!billAmount) return { huf: '0', eur: '0' };
    const amount = parseFloat(billAmount);
    if (isNaN(amount)) return { huf: '0', eur: '0' };
    const tip = (amount * parseInt(tipPercentage)) / 100;
    const totalHuf = amount + tip;
    const totalEur = rate ? totalHuf / rate : 0;
    return {
      huf: Math.round(totalHuf).toLocaleString('hu-HU'),
      eur: totalEur.toFixed(2)
    };
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  const tip = calculateTip();
  const total = calculateTotal();

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Bill Amount (HUF)</Text>
        <TextInput
          style={styles.input}
          value={billAmount}
          onChangeText={setBillAmount}
          keyboardType="numeric"
          placeholder="Enter bill amount"
          placeholderTextColor="#64748b"
        />
      </View>

      <View style={styles.tipContainer}>
        <Text style={styles.label}>Tip Percentage</Text>
        <View style={styles.tipButtons}>
          {[10, 15, 20].map((percentage) => (
            <TouchableOpacity
              key={percentage}
              style={[
                styles.tipButton,
                tipPercentage === percentage.toString() && styles.activeTipButton,
              ]}
              onPress={() => setTipPercentage(percentage.toString())}
            >
              <Text
                style={[
                  styles.tipButtonText,
                  tipPercentage === percentage.toString() && styles.activeTipButtonText,
                ]}
              >
                {percentage}%
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.resultContainer}>
        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>Tip Amount:</Text>
          <View style={styles.currencyRow}>
            <Text style={styles.currencyLabel}>HUF:</Text>
            <Text style={styles.resultValue}>{tip.huf} Ft</Text>
          </View>
          <View style={styles.currencyRow}>
            <Text style={styles.currencyLabel}>EUR:</Text>
            <Text style={styles.resultValue}>€{tip.eur}</Text>
          </View>
        </View>

        <View style={styles.resultSection}>
          <Text style={styles.resultHeader}>Total Amount:</Text>
          <View style={styles.currencyRow}>
            <Text style={styles.currencyLabel}>HUF:</Text>
            <Text style={styles.resultValue}>{total.huf} Ft</Text>
          </View>
          <View style={styles.currencyRow}>
            <Text style={styles.currencyLabel}>EUR:</Text>
            <Text style={styles.resultValue}>€{total.eur}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 24,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  tipContainer: {
    gap: 8,
  },
  tipButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 4,
  },
  tipButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 6,
  },
  activeTipButton: {
    backgroundColor: '#4F46E5',
  },
  tipButtonText: {
    color: '#374151',
    fontWeight: '600',
  },
  activeTipButtonText: {
    color: '#FFFFFF',
  },
  resultContainer: {
    gap: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  resultSection: {
    gap: 8,
  },
  resultHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  currencyRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  currencyLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});