import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import Input from '../../atoms/Input/Input';
import { FormFieldProps } from './FormField.types';
import { getFormFieldStyles } from './FormField.utils';

const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry,
  keyboardType,
  style,
}) => {
  const { colors } = useTheme();
  const styles = getFormFieldStyles(colors);

  return (
    <View style={[styles.container, style]}>
      <Input
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        error={error}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
      />
    </View>
  );
};

export default FormField; 