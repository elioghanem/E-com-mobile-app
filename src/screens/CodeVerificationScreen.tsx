import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createStyles, spacing } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';

const CodeVerificationScreen = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (text: string, idx: number) => {
    if (/^\d?$/.test(text)) {
      const newCode = [...code];
      newCode[idx] = text;
      setCode(newCode);
      if (text && idx < 3) {
        (inputRefs[idx + 1].current as any)?.focus();
      }
      if (newCode.every((digit) => digit.length === 1)) {
        Keyboard.dismiss();
        handleSubmit(newCode.join(''));
      } else {
        setError('');
      }
    }
  };

  const handleKeyPress = (e: any, idx: number) => {
    if (e.nativeEvent.key === 'Backspace' && code[idx] === '' && idx > 0) {
      (inputRefs[idx - 1].current as any)?.focus();
    }
  };

  const handleSubmit = (fullCode: string) => {
    if (fullCode === '1234') {
      setError('');
      (navigation as any).navigate('Home');
    } else {
      setError('Invalid code. Please try again.');
    }
  };

  return (
    <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
      <TouchableOpacity
        style={{ position: 'absolute', top: 60, left: 20, zIndex: 1 }}
        onPress={() => (navigation as any).navigate('Login')}
      >
        <Text style={{ fontSize: 40, color: colors.primary }}>{'←'}</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Enter Verification Code</Text>
      <View style={localStyles.codeContainer}>
        {code.map((digit, idx) => (
          <TextInput
            key={idx}
            ref={inputRefs[idx]}
            style={[localStyles.input, { 
              color: '#FFFFFF',
              borderColor: colors.primary,
              backgroundColor: '#000000'
            }]}
            value={digit}
            onChangeText={(text) => handleChange(text, idx)}
            onKeyPress={(e) => handleKeyPress(e, idx)}
            keyboardType="number-pad"
            maxLength={1}
            returnKeyType="next"
            autoFocus={idx === 0}
          />
        ))}
      </View>
      {error ? <Text style={{ color: colors.error, marginTop: spacing.md }}>{error}</Text> : null}
    </View>
  );
};

const localStyles = StyleSheet.create({
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.md,
    marginVertical: spacing.xl,
  },
  input: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderRadius: 12,
    fontSize: 28,
    textAlign: 'center',
    marginHorizontal: 8,
    backgroundColor: '#F2F2F7',
  },
});

export default CodeVerificationScreen; 