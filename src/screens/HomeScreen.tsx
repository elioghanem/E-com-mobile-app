import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { createStyles, spacing } from '../styles/globalStyles';
import productsData from '../Products.json';
import BottomTabBar from '../components/BottomTabBar';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ProductCard from '../components/ProductCard';

const { width } = Dimensions.get('window');

const FILTERS = [
  'All',
  'New',
  'Trending',
  '$ ↓',
  '$ ↑',
];

const CARD_WIDTH = (width - spacing.md * 3) / 2;

const HomeScreen = () => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const styles = createStyles(colors);
  const products = productsData.data;
  const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
  const [search, setSearch] = useState('');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => (navigation as any).navigate('ProductDetails', { id: item._id })}
      style={{ flex: 1, marginHorizontal: spacing.xs }}
    >
      <ProductCard item={item} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}> 
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, marginBottom: spacing.md }}>
        <Text style={[styles.heading, { fontSize: 24 }]}>{'Discover Products'}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              borderRadius: 18,
              backgroundColor: colors.inputBackground,
              overflow: 'hidden',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 10,
            }}
            onPress={toggleTheme}
          >
            <Text style={{ fontSize: 20, color: colors.text }}>{isDarkMode ? '🌞' : '🌙'}</Text>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: colors.inputBackground, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}
              onPress={() => setDropdownVisible((v) => !v)}
            >
              <Text style={{ fontSize: 18, color: colors.text }}>👤</Text>
            </TouchableOpacity>
            {dropdownVisible && (
              <View style={[localStyles.dropdown, { backgroundColor: colors.inputBackground, shadowColor: colors.text }] }>
                <Pressable
                  style={localStyles.dropdownItem}
                  onPress={() => setDropdownVisible(false)}
                >
                  <Text style={[localStyles.dropdownText, { color: colors.text }]}>View Profile</Text>
                </Pressable>
                <Pressable
                  style={localStyles.dropdownItem}
                  onPress={() => {
                    setDropdownVisible(false);
                    (navigation as any).navigate('SignUp');
                  }}
                >
                  <Text style={[localStyles.dropdownText, { color: colors.error }]}>Sign Out</Text>
                </Pressable>
              </View>
            )}
          </View>
        </View>
      </View>
      <View style={{ paddingHorizontal: spacing.md, marginBottom: spacing.md }}>
        <View style={[localStyles.searchBar, { backgroundColor: colors.inputBackground }]}>
          <Text style={{ fontSize: 18, marginRight: 8, color: colors.text + '99' }}>🔍</Text>
          <TextInput
            style={{ flex: 1, fontSize: 16, color: colors.text }}
            placeholder="Search"
            placeholderTextColor={colors.text + '99'}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={localStyles.filterBar}
        style={{ marginBottom: spacing.lg }}
      >
        {FILTERS.map((filter, idx) => (
          <TouchableOpacity
            key={filter}
            style={[localStyles.filterButton, { backgroundColor: colors.inputBackground }, selectedFilter === filter && { backgroundColor: colors.primary }]}
            activeOpacity={0.7}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={{
              fontWeight: 'bold',
              color: selectedFilter === filter ? '#fff' : colors.text,
              fontSize: 15,
              flexShrink: 1,
              textAlign: 'center',
              minWidth: 0,
              maxWidth: 120,
              flexWrap: 'wrap',
            }}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 80 + spacing.xl, paddingHorizontal: spacing.md }}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ 
          justifyContent: 'space-between', 
          marginBottom: spacing.lg,
          gap: spacing.md 
        }}
      />
      <BottomTabBar activeTab="Home" />
    </SafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f7',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    marginBottom: 0,
  },
  filterBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
    paddingVertical: 8,
    marginBottom: 0,
    backgroundColor: 'transparent',
  },
  filterButton: {
    backgroundColor: '#f2f2f7',
    borderRadius: 28,
    height: 40,
    minWidth: 80,
    maxWidth: 140,
    paddingHorizontal: 22,
    marginRight: spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  card: {
    width: CARD_WIDTH,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
    backgroundColor: '#fff',
    marginBottom: 0,
    marginTop: 0,
    marginHorizontal: 0,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: CARD_WIDTH * 1.15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#eee',
  },
  dropdown: {
    position: 'absolute',
    top: 44,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
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
    color: '#333',
  },
});

export default HomeScreen; 