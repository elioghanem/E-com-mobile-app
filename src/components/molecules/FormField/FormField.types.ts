import { ViewStyle, KeyboardType } from 'react-native';

export interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  style?: ViewStyle;
} 