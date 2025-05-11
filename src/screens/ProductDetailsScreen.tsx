import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../styles/globalStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import productsData from '../Products.json';

const ProductDetailsScreen = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const insets = useSafeAreaInsets();
  // @ts-ignore
  const { id } = route.params;
  const product = productsData.data.find((p: any) => p._id === id);

  // Define styles with the current theme colors
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    headerRight: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: spacing.sm,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    iconButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: spacing.sm,
    },
    image: {
      height: 300,
      borderRadius: 20,
      marginBottom: spacing.lg,
      backgroundColor: colors.inputBackground,
    },
    title: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
      color: colors.text,
    },
    price: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: spacing.md,
      color: colors.primary,
    },
    description: {
      fontSize: 16,
      marginBottom: spacing.xl,
      opacity: 0.9,
      lineHeight: 24,
      color: colors.text,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: spacing.md,
    },
    button: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 1.5,
      borderColor: colors.border,
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text,
    },
    dropdown: {
      position: 'absolute',
      top: 44,
      right: 0,
      borderRadius: 12,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 8,
      elevation: 6,
      minWidth: 140,
      zIndex: 1000,
      backgroundColor: colors.inputBackground,
    },
    dropdownItem: {
      paddingVertical: 12,
      paddingHorizontal: 18,
    },
    dropdownText: {
      fontSize: 16,
      color: colors.text,
    },
    heading: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
      color: colors.text,
    },
    text: {
      fontSize: 16,
      marginBottom: spacing.xl,
      opacity: 0.9,
      lineHeight: 24,
      color: colors.text,
    },
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  if (!product) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.text, fontSize: 20 }}>Product not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background, paddingTop: insets.top }]}>
      <View style={[styles.header, { backgroundColor: colors.background }]}>
        <TouchableOpacity
          style={[styles.backButton, { 
            backgroundColor: colors.inputBackground,
            borderWidth: 1,
            borderColor: colors.border,
          }]}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 26, fontWeight: 'bold', color: colors.text }}>←</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.primary }]}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Text style={{ color: '#fff', fontSize: 20 }}>
            {isDarkMode ? '🌞' : '🌙'}
          </Text>
        </TouchableOpacity>
      </View>

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
            paddingTop: spacing.sm,
            paddingBottom: spacing.xxl + insets.bottom,
          }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View style={{ 
            flexDirection: dimensions.width > dimensions.height ? 'row' : 'column',
            gap: spacing.lg,
            alignItems: dimensions.width > dimensions.height ? 'flex-start' : 'center',
          }}>
            {/* Product Image Section */}
            <View style={{ 
              width: dimensions.width > dimensions.height ? '50%' : '100%',
              aspectRatio: 1,
              borderRadius: 12,
              overflow: 'hidden',
              backgroundColor: colors.inputBackground,
              elevation: 4,
            }}>
              <Image
                source={{ uri: product.images[0].url }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            </View>

            {/* Product Details Section */}
            <View style={{ 
              flex: dimensions.width > dimensions.height ? 1 : undefined,
              width: dimensions.width > dimensions.height ? '50%' : '100%',
              gap: spacing.md,
            }}>
              <Text style={styles.heading}>{product.title}</Text>
              <Text style={[styles.text, { color: colors.primary, fontSize: 24, fontWeight: 'bold' }]}>
                ${product.price}
              </Text>
              <Text style={styles.text}>{product.description}</Text>

              <View style={{ flexDirection: 'row', gap: spacing.sm, marginTop: spacing.md }}>
                <TouchableOpacity
                  style={[styles.button, { flex: 1 }]}
                  onPress={() => {
                    // Handle add to cart
                  }}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, { flex: 1, backgroundColor: colors.primary }]}
                  onPress={() => {
                    // Handle buy now
                  }}
                >
                  <Text style={[styles.buttonText, { color: '#fff' }]}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen; 