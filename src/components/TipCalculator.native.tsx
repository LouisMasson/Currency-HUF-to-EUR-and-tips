import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export function TipCalculator() {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('10');

  const calculateTip = () => {
    if (!billAmount) return '0';
    const amount = parseFloat(billAmount);
    if (isNaN(amount)) return '0';
    const tip = (amount * parseInt(tipPercentage)) / 100;
    return Math.round(tip).toLocaleString('hu-HU');
  };

  const calculateTotal = () => {
    if (!billAmount) return '0';
    const amount = parseFloat(billAmount);
    if (isNaN(amount)) return '0';
    const tip = (amount * parseInt(tipPercentage)) / 100;
    return Math.round(amount + tip).toLocaleString('hu-HU');
  };

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
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Tip Amount:</Text>
          <Text style={styles.resultValue}>{calculateTip()} Ft</Text>
        </View>
        <View style={styles.resultRow}>
          <Text style={styles.resultLabel}>Total Amount:</Text>
          <Text style={styles.resultValue}>{calculateTotal()} Ft</Text>
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
    gap: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    color: '#374151',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
});