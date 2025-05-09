import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from '../../../context/ThemeContext';
import FormField from '../../molecules/FormField/FormField';
import Button from '../../atoms/Button/Button';
import { LoginFormProps } from './LoginForm.types';
import { getLoginFormStyles } from './LoginForm.utils';

const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  isLoading,
  error,
  style,
}) => {
  const { colors } = useTheme();
  const styles = getLoginFormStyles(colors);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ email, password });
  };

  return (
    <View style={[styles.container, style]}>
      <FormField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        error={error?.email}
      />
      <FormField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        secureTextEntry
        error={error?.password}
      />
      {error?.general && (
        <Text style={styles.errorText}>{error.general}</Text>
      )}
      <Button
        title={isLoading ? 'Loading...' : 'Login'}
        onPress={handleSubmit}
        disabled={isLoading}
        style={styles.button}
      />
    </View>
  );
};

export default LoginForm; 