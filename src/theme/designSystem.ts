/**
 * Unified Design System Tokens for Scroll It
 * Supports strict constraints, cohesive Day Mode (أبيض مموج بزيتي), and Night Mode.
 */

export interface ThemeColors {
  isDayMode: boolean;
  pageBg: string;
  cardBg: string;
  cardBorder: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  accent: string;
  accentBg: string;
  divider: string;
  inputBg: string;
  inputBorder: string;
}

export const getTheme = (isDayMode: boolean): ThemeColors => {
  if (isDayMode) {
    return {
      isDayMode: true,
      pageBg: 'bg-[#F2F6F3]',
      cardBg: 'bg-white',
      cardBorder: 'border-[#D4E0D8]',
      textPrimary: 'text-[#102318]',
      textSecondary: 'text-[#3E5A4B]',
      textMuted: 'text-[#6C8577]',
      accent: 'text-[#1E4D34]',
      accentBg: 'bg-[#E3EDE6]',
      divider: 'border-[#DBE5DF]',
      inputBg: 'bg-white',
      inputBorder: 'border-[#CDD9D1]',
    };
  }

  return {
    isDayMode: false,
    pageBg: 'bg-[#0E100F]',
    cardBg: 'bg-[#151917]',
    cardBorder: 'border-[#262D29]',
    textPrimary: 'text-[#F1EDE5]',
    textSecondary: 'text-[#B6BBB7]',
    textMuted: 'text-[#8C928E]',
    accent: 'text-[#A9B9AF]',
    accentBg: 'bg-[#203029]',
    divider: 'border-[#262D29]',
    inputBg: 'bg-[#121514]',
    inputBorder: 'border-[#2D3631]',
  };
};
