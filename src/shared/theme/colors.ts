const languageColors: Record<string, string> = {
  TypeScript: '#3178C6',
  JavaScript: '#F1E05A',
  Python: '#3572A5',
  Java: '#B07219',
  Go: '#00ADD8',
  Rust: '#DEA584',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Ruby: '#701516',
  'C++': '#F34B7D',
  C: '#555555',
  'C#': '#178600',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  Shell: '#89E051',
  HTML: '#E34C26',
  CSS: '#563D7C',
  Vue: '#41B883',
  Scala: '#C22D40',
  Elixir: '#6E4A7E',
};

export const darkColors = {
  background: '#0D1117',
  backgroundElevated: '#161B22',
  card: '#1C2333',
  cardBorder: '#30363D',

  textPrimary: '#F0F6FC',
  textSecondary: '#8B949E',
  textTertiary: '#6E7681',
  textInverse: '#0D1117',

  accent: '#E8A838',
  accentLight: '#F0C05A',
  accentDark: '#C08A20',

  success: '#3FB950',
  error: '#F85149',
  warning: '#D29922',
  info: '#58A6FF',

  buttonPrimary: '#F0F6FC',
  buttonPrimaryText: '#0D1117',
  buttonSecondary: '#21262D',
  buttonSecondaryText: '#F0F6FC',

  separator: '#21262D',
  overlay: 'rgba(0, 0, 0, 0.5)',
  searchBackground: '#0D1117',
  searchBorder: '#30363D',
  avatarBorder: '#30363D',

  languageColors,
};

export const lightColors = {
  background: '#F0F3F6',
  backgroundElevated: '#FFFFFF',
  card: '#FFFFFF',
  cardBorder: '#D1D9E0',

  textPrimary: '#1F2328',
  textSecondary: '#59636E',
  textTertiary: '#8B949E',
  textInverse: '#FFFFFF',

  accent: '#C08A20',
  accentLight: '#E8A838',
  accentDark: '#8A6515',

  success: '#1A7F37',
  error: '#CF222E',
  warning: '#9A6700',
  info: '#0969DA',

  buttonPrimary: '#1F2328',
  buttonPrimaryText: '#FFFFFF',
  buttonSecondary: '#E7ECF0',
  buttonSecondaryText: '#1F2328',

  separator: '#D1D9E0',
  overlay: 'rgba(0, 0, 0, 0.3)',
  searchBackground: '#FFFFFF',
  searchBorder: '#D1D9E0',
  avatarBorder: '#D1D9E0',

  languageColors,
};

export type AppColors = typeof darkColors;

export const colors = darkColors;
