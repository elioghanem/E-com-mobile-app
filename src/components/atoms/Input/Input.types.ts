import { ViewStyle, TextStyle, KeyboardType } from 'react-native';

export interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardType;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
} 