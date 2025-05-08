import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '../context/ThemeContext';
import { createStyles, spacing } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

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
        <Text style={{ color: '#fff', fontSize: 20 }}>{isDarkMode ? '🌞' : '🌙'}</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.heading}>Create Account</Text>

          <View style={{ gap: spacing.md }}>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={styles.text}>Name</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your name"
                    placeholderTextColor={colors.border}
                  />
                  {errors.name && (
                    <Text style={styles.errorText}>{errors.name.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={styles.text}>Email</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your email"
                    placeholderTextColor={colors.border}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={styles.text}>Password</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your password"
                    placeholderTextColor={colors.border}
                    secureTextEntry
                  />
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, value } }) => (
                <View>
                  <Text style={styles.text}>Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your phone number"
                    placeholderTextColor={colors.border}
                    keyboardType="phone-pad"
                  />
                  {errors.phoneNumber && (
                    <Text style={styles.errorText}>
                      {errors.phoneNumber.message}
                    </Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ marginTop: spacing.lg, alignItems: 'center' }}
              onPress={() => (navigation as any).navigate('Login', { fromSignUp: true })}>
              <Text style={[styles.text, { color: colors.primary }]}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen; 