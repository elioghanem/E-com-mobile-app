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
import { useAuth } from '../context/AuthContext';


const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginScreen = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);

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
      login();
      (navigation as any).navigate('CodeVerification');
    } else {
      // Optionally show error
      console.log('Invalid credentials');
    }
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
        activeOpacity={0.7}
      >
        <Text style={{ color: '#fff', fontSize: 20 }}>{isDarkMode ? '🌞' : '🌙'}</Text>
      </TouchableOpacity>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text style={styles.heading}>Login</Text>

          <View style={{ gap: spacing.md }}>
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
                    returnKeyType="next"
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
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TextInput
                      style={[styles.input, { flex: 1 }]}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Enter your password"
                      placeholderTextColor={colors.border}
                      secureTextEntry={!showPassword}
                      returnKeyType="done"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword((prev) => !prev)}
                      style={{ position: 'absolute', right: 12 }}
                    >
                      <Text style={{ fontSize: 24 }}>
                        {showPassword ? '🙈' : '👁️'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {errors.password && (
                    <Text style={styles.errorText}>{errors.password.message}</Text>
                  )}
                </View>
              )}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(onSubmit)}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{ marginTop: spacing.lg, alignItems: 'center' }}
            onPress={() => (navigation as any).navigate('SignUp', { fromLogin: true })}>
            <Text style={[styles.text, { color: colors.primary }]}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen; 