import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { spacing } from '../styles/globalStyles';

const ProductCard = ({ item }: any) => {
  const { colors } = useTheme();
  const [isFavorite, setIsFavorite] = React.useState(false);

  return (
    <View style={[styles.card, { backgroundColor: colors.background }]}>
      <Image
        source={{ uri: item.images[0].url }}
        style={styles.image}
        resizeMode="cover"
      />
      <TouchableOpacity
        style={[styles.heartButton, { backgroundColor: colors.inputBackground }]}
        onPress={() => setIsFavorite(!isFavorite)}
      >
        <Text style={{ fontSize: 20 }}>{isFavorite ? '❤️' : '🤍'}</Text>
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>
          ${item.price}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 0,
    marginTop: 0,
    marginHorizontal: 0,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: '#eee',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    padding: spacing.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductCard; 