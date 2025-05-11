import React, { useState, useEffect } from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '../context/ThemeContext';
import { createStyles, spacing } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FONTS } from '../theme/fonts';

// Define the validation schema
const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  phoneNumber: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const SignUpScreen = () => {
  const { colors, isDarkMode, toggleTheme, typography } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
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
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phoneNumber: '',
    },
  });

  const onSubmit = (data: SignUpFormData) => {
    console.log(data);
    // Handle sign up logic here
  };

  const customStyles = StyleSheet.create({
    pageTitle: {
      ...typography.h1,
      color: colors.text,
      marginBottom: spacing.md,
    },
    labelText: {
      ...typography.bodyMedium,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    customButton: {
      backgroundColor: colors.primary,
      padding: spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: spacing.lg,
    },
    buttonLabel: {
      ...typography.button,
      color: '#FFFFFF',
    },
    inputField: {
      ...typography.bodyMedium,
      backgroundColor: colors.background,
      borderWidth: 1.5,
      borderColor: colors.border,
      borderRadius: 10,
      padding: spacing.md,
      color: colors.text,
    },
    errorMessage: {
      ...typography.bodySmall,
      color: colors.error,
      marginTop: spacing.xs,
    },
    loginLink: {
      ...typography.bodyMedium,
      color: colors.primary,
      textAlign: 'center',
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
      >
        <Text style={{ color: '#fff', fontSize: 20, fontFamily: FONTS.primary.regular }}>{isDarkMode ? '🌞' : '🌙'}</Text>
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
          <Text style={customStyles.pageTitle}>Create Account</Text>

          <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={customStyles.labelText}>Name</Text>
                  <TextInput
                    style={customStyles.inputField}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your name"
                    placeholderTextColor={colors.border}
                  />
                  {errors.name && (
                    <Text style={customStyles.errorMessage}>{errors.name.message}</Text>
                  )}
                </View>
              )}
            />

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
                  <TextInput
                    style={customStyles.inputField}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.border}
                    secureTextEntry
                  />
                  {errors.password && (
                    <Text style={customStyles.errorMessage}>{errors.password.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={customStyles.labelText}>Phone Number</Text>
                  <TextInput
                    style={customStyles.inputField}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your phone number"
                    placeholderTextColor={colors.border}
                    keyboardType="phone-pad"
                  />
                  {errors.phoneNumber && (
                    <Text style={customStyles.errorMessage}>
                      {errors.phoneNumber.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              style={customStyles.customButton}
              onPress={handleSubmit(onSubmit)}
            >
              <Text style={customStyles.buttonLabel}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: spacing.lg, alignItems: 'center' }}
              onPress={() => (navigation as any).navigate('Login')}
            >
              <Text style={customStyles.loginLink}>
                Already have an account? Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen; 