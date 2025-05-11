import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '../context/ThemeContext';
import { createStyles, spacing } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '../context/AuthContext';
import { FONTS, FONT_WEIGHTS } from '../theme/fonts';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const { colors, isDarkMode, toggleTheme, typography } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    if (
      data.email === 'eurisko@gmail.com' &&
      data.password === 'academy2025'
    ) {
      setErrorMessage('');
      login();
      (navigation as any).navigate('CodeVerification');
    } if(
      data.email !== 'eurisko@gmail.com' ||
      data.password !== 'academy2025'
    ) {
      setErrorMessage('Invalid email or password');
    }
  };

  const customStyles = StyleSheet.create({
    pageTitle: {
      fontFamily: FONTS.primary.regular,
      fontSize: 32,
      fontWeight: FONT_WEIGHTS.bold,
      color: colors.text,
      marginBottom: spacing.md,
    },
    welcomeText: {
      fontFamily: FONTS.primary.regular,
      fontSize: 16,
      fontWeight: FONT_WEIGHTS.medium,
      color: colors.secondary,
      marginBottom: spacing.md,
    },
    labelText: {
      fontFamily: FONTS.primary.regular,
      fontSize: 16,
      fontWeight: FONT_WEIGHTS.regular,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    inputField: {
      fontFamily: FONTS.primary.regular,
      fontSize: 16,
      backgroundColor: colors.background,
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 10,
      padding: spacing.md,
      color: colors.text,
    },
    errorMessage: {
      fontFamily: FONTS.primary.regular,
      fontSize: 14,
      color: colors.error,
      marginTop: spacing.xs,
    },
    loginButton: {
      backgroundColor: colors.primary,
      padding: spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.lg,
    },
    buttonLabel: {
      fontFamily: FONTS.primary.regular,
      fontSize: 16,
      fontWeight: FONT_WEIGHTS.medium,
      color: '#FFFFFF',
    },
    signupLink: {
      fontFamily: FONTS.primary.regular,
      fontSize: 16,
      color: colors.primary,
      textAlign: 'center',
    },
    themeToggleText: {
      fontFamily: FONTS.primary.regular,
      color: '#fff',
      fontSize: 20,
    },
    eyeIcon: {
      position: 'absolute',
      right: 12,
    },
    eyeIconText: {
      fontFamily: FONTS.primary.regular,
      fontSize: 24,
    },
  });

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: insets.top + 10,
          right: insets.right + 10,
          zIndex: 1,
          backgroundColor: colors.primary,
          borderRadius: 20,
          padding: 8,
        }}
        onPress={toggleTheme}
        activeOpacity={0.7}
      >
        <Text style={customStyles.themeToggleText}>
          {isDarkMode ? '🌞' : '🌙'}
        </Text>
      </TouchableOpacity>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: spacing.md,
            paddingTop: spacing.xl,
            paddingBottom: spacing.xxl + insets.bottom,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <Text style={customStyles.pageTitle}>Login</Text>
          <Text style={customStyles.welcomeText}>Welcome back! Please sign in to continue.</Text>

          <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={customStyles.labelText}>Email</Text>
                  <TextInput
                    style={customStyles.inputField}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.border}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  {errors.email && (
                    <Text style={customStyles.errorMessage}>{errors.email.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={customStyles.labelText}>Password</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      style={[customStyles.inputField, { flex: 1 }]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter your password"
                      placeholderTextColor={colors.border}
                      secureTextEntry={!showPassword}
                      returnKeyType="done"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword((prev) => !prev)}
                      style={customStyles.eyeIcon}
                    >
                      <Text style={customStyles.eyeIconText}>
                        {showPassword ? '🙈' : '👁️'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={customStyles.errorMessage}>{errors.password.message}</Text>
                  )}
                </View>
              )}
            />

            {/* Show login error message */}
            {errorMessage !== '' && (
              <Text style={[customStyles.errorMessage, { marginTop: 10 }]}>{errorMessage}</Text>
            )}

            <TouchableOpacity
              style={customStyles.loginButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={customStyles.buttonLabel}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: spacing.lg, alignItems: 'center' }}
              onPress={() => (navigation as any).navigate('SignUp', { fromLogin: true })}
            >
              <Text style={customStyles.signupLink}>
                Don't have an account? Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
