// Font family definitions
export const FONTS = {
  primary: {
    regular: 'Poppins-Regular',
  },
};

// Font size definitions
export const FONT_SIZES = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

// Font weight definitions
export const FONT_WEIGHTS = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

// Line height definitions
export const LINE_HEIGHTS = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 36,
};

// Typography styles
export const TYPOGRAPHY = {
  h1: {
    fontFamily: FONTS.primary.regular,
    fontSize: FONT_SIZES.xxxl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.xxl,
  },
  h2: {
    fontFamily: FONTS.primary.regular,
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.xl,
  },
  h3: {
    fontFamily: FONTS.primary.regular,
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.semiBold,
    lineHeight: LINE_HEIGHTS.lg,
  },
  bodyLarge: {
    fontFamily: FONTS.primary.regular,
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.md,
  },
  bodyMedium: {
    fontFamily: FONTS.primary.regular,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.sm,
  },
  bodySmall: {
    fontFamily: FONTS.primary.regular,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.regular,
    lineHeight: LINE_HEIGHTS.xs,
  },
  button: {
    fontFamily: FONTS.primary.regular,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.medium,
    lineHeight: LINE_HEIGHTS.sm,
  },
}; 