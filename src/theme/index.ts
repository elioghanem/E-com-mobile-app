import { FONTS, FONT_SIZES, FONT_WEIGHTS, LINE_HEIGHTS, TYPOGRAPHY } from './fonts';

export const theme = {
  fonts: FONTS,
  fontSizes: FONT_SIZES,
  fontWeights: FONT_WEIGHTS,
  lineHeights: LINE_HEIGHTS,
  typography: TYPOGRAPHY,
};

export type Theme = typeof theme;

export * from './fonts'; 