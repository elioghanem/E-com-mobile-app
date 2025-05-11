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
import { FONTS } from '../theme/fonts';

const CodeVerificationScreen = () => {
  const { colors, typography } = useTheme();
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

  const customStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    pageTitle: {
      fontFamily: FONTS.primary.regular,
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      textAlign: 'center',
      marginBottom: spacing.lg,
    },
    subtitle: {
      fontFamily: FONTS.primary.regular,
      fontSize: 16,
      fontWeight: 'normal',
      color: colors.secondary,
      textAlign: 'center',
      marginBottom: spacing.xl,
      paddingHorizontal: spacing.lg,
    },
    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: spacing.md,
      marginVertical: spacing.xl,
    },
    codeInput: {
      width: 48,
      height: 56,
      borderWidth: 2,
      borderRadius: 12,
      fontSize: 28,
      fontFamily: FONTS.primary.regular,
      textAlign: 'center',
      marginHorizontal: 8,
      color: '#FFFFFF',
      borderColor: colors.primary,
      backgroundColor: '#000000',
    },
    errorText: {
      fontFamily: FONTS.primary.regular,
      color: colors.error,
      fontSize: 14,
      marginTop: spacing.md,
      textAlign: 'center',
    },
    backButton: {
      position: 'absolute',
      top: 60,
      left: 20,
      zIndex: 1,
    },
    backButtonText: {
      fontSize: 40,
      color: colors.primary,
      fontFamily: FONTS.primary.regular,
    },
  });

  return (
    <View style={customStyles.container}> 
      <TouchableOpacity
        style={customStyles.backButton}
        onPress={() => (navigation as any).navigate('Login')}
      >
        <Text style={customStyles.backButtonText}>{'←'}</Text>
      </TouchableOpacity>
      
      <Text style={customStyles.pageTitle}>Enter Verification Code</Text>
      <Text style={customStyles.subtitle}>
        We've sent a verification code to your email. Please enter it below.
      </Text>
      
      <View style={customStyles.codeContainer}>
        {code.map((digit, idx) => (
          <TextInput
            key={idx}
            ref={inputRefs[idx]}
            style={customStyles.codeInput}
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
      
      {error ? <Text style={customStyles.errorText}>{error}</Text> : null}
    </View>
  );
};

export default CodeVerificationScreen; 