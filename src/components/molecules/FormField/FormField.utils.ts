import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../context/ThemeContext';

export const getFormFieldStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      width: '100%',
    },
  }); 