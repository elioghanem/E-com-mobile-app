import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../styles/globalStyles';
import { useRoute, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import productsData from '../Products.json';

const ProductDetailsScreen = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const route = useRoute();
  const navigation = useNavigation();
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  // @ts-ignore
  const { id } = route.params;
  const product = productsData.data.find((p: any) => p._id === id);

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
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ fontSize: 24, color: colors.text }}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: colors.inputBackground }]}
            onPress={toggleTheme}
          >
            <Text style={{ fontSize: 20, color: colors.text }}>{isDarkMode ? '🌞' : '🌙'}</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={[styles.iconButton, { backgroundColor: colors.inputBackground }]}
              onPress={() => setDropdownVisible(!dropdownVisible)}
            >
              <Text style={{ fontSize: 18, color: colors.text }}>👤</Text>
            </TouchableOpacity>
            {dropdownVisible && (
              <View style={[styles.dropdown, { backgroundColor: colors.inputBackground, shadowColor: colors.text }]}>
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => setDropdownVisible(false)}
                >
                  <Text style={[styles.dropdownText, { color: colors.text }]}>View Profile</Text>
                </Pressable>
                <Pressable
                  style={styles.dropdownItem}
                  onPress={() => {
                    setDropdownVisible(false);
                    (navigation as any).navigate('SignUp');
                  }}
                >
                  <Text style={[styles.dropdownText, { color: colors.error }]}>Sign Out</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: spacing.md }}>
        <Image
          source={{ uri: product.images[0].url }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={[styles.title, { color: colors.text }]}>{product.title}</Text>
        <Text style={[styles.price, { color: colors.primary }]}>${product.price}</Text>
        <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.inputBackground, borderColor: colors.primary }]}
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, { color: colors.primary }]}>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.primary }]} 
            activeOpacity={0.7}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    width: '100%',
    height: 300,
    borderRadius: 20,
    marginBottom: spacing.lg,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  price: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 16,
    marginBottom: spacing.xl,
    opacity: 0.9,
    lineHeight: 24,
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
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 18,
  },
  dropdownText: {
    fontSize: 16,
  },
});

export default ProductDetailsScreen; 