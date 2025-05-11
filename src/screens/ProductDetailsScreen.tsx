import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../styles/globalStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import productsData from '../Products.json';
import { FONTS } from '../theme/fonts';

const ProductDetailsScreen = () => {
  const { colors, isDarkMode, toggleTheme, typography } = useTheme();
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
    backButtonText: {
      fontSize: 26,
      fontWeight: 'bold',
      color: colors.text,
      fontFamily: FONTS.primary.regular,
    },
    iconButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: spacing.sm,
    },
    themeToggleText: {
      color: '#fff', 
      fontSize: 20,
      fontFamily: FONTS.primary.regular,
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
      fontFamily: FONTS.primary.regular,
    },
    price: {
      fontSize: 22,
      fontWeight: '600',
      marginBottom: spacing.md,
      color: colors.primary,
      fontFamily: FONTS.primary.regular,
    },
    description: {
      fontSize: 16,
      marginBottom: spacing.xl,
      opacity: 0.9,
      lineHeight: 24,
      color: colors.text,
      fontFamily: FONTS.primary.regular,
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
      fontFamily: FONTS.primary.regular,
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
      fontFamily: FONTS.primary.regular,
    },
    heading: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: spacing.sm,
      color: colors.text,
      fontFamily: FONTS.primary.regular,
    },
    text: {
      fontSize: 16,
      marginBottom: spacing.xl,
      opacity: 0.9,
      lineHeight: 24,
      color: colors.text,
      fontFamily: FONTS.primary.regular,
    },
    productNotFound: {
      color: colors.text,
      fontSize: 20,
      fontFamily: FONTS.primary.regular,
    },
    category: {
      fontSize: 14,
      color: colors.secondary,
      marginBottom: spacing.sm,
      fontFamily: FONTS.primary.regular,
    },
    buyNowButton: {
      flex: 1,
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      backgroundColor: colors.primary,
    },
    buyNowText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF',
      fontFamily: FONTS.primary.regular,
    },
    noImageText: {
      fontFamily: FONTS.primary.regular,
      color: colors.text,
      fontSize: 16,
      textAlign: 'center',
    }
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
          <Text style={styles.productNotFound}>Product not found.</Text>
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
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.iconButton, { backgroundColor: colors.primary }]}
          onPress={toggleTheme}
          activeOpacity={0.7}
        >
          <Text style={styles.themeToggleText}>
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
            }}>
              {product.images && product.images.length > 0 ? (
                <Image 
                  source={{ uri: product.images[0].url }} 
                  style={styles.image} 
                  resizeMode="cover" 
                />
              ) : (
                <View style={[styles.image, { 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  backgroundColor: colors.inputBackground
                }]}>
                  <Text style={styles.noImageText}>
                    No image available
                  </Text>
                </View>
              )}
            </View>

            {/* Product Details Section */}
            <View style={{ 
              width: dimensions.width > dimensions.height ? '45%' : '100%',
              flexShrink: 1,
            }}>
              <Text style={styles.category}>{product.category || 'Electronics'}</Text>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>${product.price.toFixed(2)}</Text>
              <Text style={styles.description}>{product.description}</Text>
              
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buyNowButton}>
                  <Text style={styles.buyNowText}>Buy Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {dropdownVisible && (
            <View style={styles.dropdown}>
              <Pressable style={styles.dropdownItem} onPress={() => {
                // Handle share action
                setDropdownVisible(false);
              }}>
                <Text style={styles.dropdownText}>Share</Text>
              </Pressable>
              <Pressable style={styles.dropdownItem} onPress={() => {
                // Handle favorite action
                setDropdownVisible(false);
              }}>
                <Text style={styles.dropdownText}>Add to Favorites</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen; 