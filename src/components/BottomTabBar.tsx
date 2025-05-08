import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const TABS = [
  { key: 'Home', icon: '🏠', label: 'Home' },
  { key: 'Cart', icon: '🛒', label: 'Cart' },
  { key: 'Profile', icon: '👤', label: 'Profile' },
];

const BottomTabBar = ({ activeTab = 'Home', onTabPress }: { activeTab?: string; onTabPress?: (tab: string) => void }) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background, borderTopColor: colors.border }]}> 
      {TABS.map(tab => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          activeOpacity={0.7}
          onPress={() => onTabPress && onTabPress(tab.key)}
        >
          <Text style={{ fontSize: 26, color: activeTab === tab.key ? colors.primary : colors.text }}>{tab.icon}</Text>
          <Text style={{ fontSize: 12, color: activeTab === tab.key ? colors.primary : colors.text, marginTop: 2 }}>{tab.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 64,
    borderTopWidth: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    paddingBottom: Platform.OS === 'ios' ? 16 : 0,
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
});

export default BottomTabBar; 