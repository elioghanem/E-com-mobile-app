import { StyleSheet, Dimensions, PixelRatio } from 'react-native';
import { ThemeColors } from '../context/ThemeContext';
import { FONTS } from '../theme/fonts';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Responsive font size
const scale = SCREEN_WIDTH / 375; // 375 is the base width (iPhone 8)
export const normalize = (size: number) => {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Spacing scale
export const spacing = {
  xs: normalize(4),
  sm: normalize(8),
  md: normalize(16),
  lg: normalize(24),
  xl: normalize(32),
  xxl: normalize(48),
};

// Create responsive styles
export const createStyles = (colors: ThemeColors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  text: {
    fontFamily: FONTS.primary.regular,
    color: colors.text,
    fontSize: normalize(16),
  },
  heading: {
    fontFamily: FONTS.primary.regular,
    color: colors.text,
    fontSize: normalize(24),
    fontWeight: 'bold',
    marginBottom: spacing.md,
  },
  subheading: {
    fontFamily: FONTS.primary.regular,
    color: colors.text,
    fontSize: normalize(18),
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONTS.primary.regular,
    color: '#FFFFFF',
    fontSize: normalize(16),
    fontWeight: '600',
  },
  input: {
    fontFamily: FONTS.primary.regular,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: spacing.md,
    fontSize: normalize(16),
    color: colors.text,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: colors.text,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  errorText: {
    fontFamily: FONTS.primary.regular,
    color: colors.error,
    fontSize: normalize(14),
    marginTop: spacing.xs,
  },
  gradientBackground: {
    backgroundColor: 'rgba(255, 59, 48, 0.1)', // Light red
  },
  highlightBackground: {
    backgroundColor: 'rgba(255, 149, 0, 0.1)', // Light orange
  },
  accentBorder: {
    borderColor: 'rgba(255, 59, 48, 0.3)', // Semi-transparent red
  },
  accentBackground: {
    backgroundColor: 'rgba(255, 149, 0, 0.2)', // Semi-transparent orange
  },
}); 