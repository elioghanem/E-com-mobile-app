import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../context/ThemeContext';

export const getLoginFormStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
      padding: 16,
    },
    errorText: {
      color: colors.error,
      fontSize: 14,
      marginTop: 8,
      textAlign: 'center',
    },
    button: {
      marginTop: 24,
    },
  }); 