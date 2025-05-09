import { ViewStyle } from 'react-native';

export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginFormError {
  email?: string;
  password?: string;
  general?: string;
}

export interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  isLoading?: boolean;
  error?: LoginFormError;
  style?: ViewStyle;
} 