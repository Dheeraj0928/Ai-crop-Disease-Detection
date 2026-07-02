import { createMuiTheme } from '@material-ui/core/styles';

export const tokens = {
  colors: {
    primary: '#059669',
    primaryDark: '#047857',
    primaryLight: '#d1fae5',
    secondary: '#0f766e',
    accent: '#f59e0b',
    danger: '#dc2626',
    dangerDark: '#b91c1c',
    surface: '#ffffff',
    surfaceMuted: '#f8fafc',
    background: '#f0fdf4',
    backgroundDeep: '#ecfdf5',
    textPrimary: '#0f172a',
    textSecondary: '#64748b',
    textMuted: '#94a3b8',
    border: '#e2e8f0',
    borderFocus: '#059669',
    footer: '#0f172a',
    footerText: '#cbd5e1',
  },
  radius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    pill: 9999,
  },
  shadow: {
    sm: '0 1px 2px rgba(15, 23, 42, 0.06)',
    md: '0 4px 24px rgba(15, 23, 42, 0.08)',
    lg: '0 12px 40px rgba(15, 23, 42, 0.12)',
    glow: '0 8px 32px rgba(5, 150, 105, 0.18)',
  },
  spacing: {
    pageY: 48,
    pageYMobile: 32,
    section: 64,
    card: 32,
    cardMobile: 24,
  },
  typography: {
    fontFamily: "'DM Sans', 'Poppins', system-ui, sans-serif",
  },
  transition: '0.2s cubic-bezier(0.4, 0, 0.2, 1)',
};

const theme = createMuiTheme({
  palette: {
    primary: { main: tokens.colors.primary, dark: tokens.colors.primaryDark, light: tokens.colors.primaryLight },
    secondary: { main: tokens.colors.secondary },
    error: { main: tokens.colors.danger },
    text: { primary: tokens.colors.textPrimary, secondary: tokens.colors.textSecondary },
    background: { default: tokens.colors.background, paper: tokens.colors.surface },
  },
  typography: {
    fontFamily: tokens.typography.fontFamily,
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: tokens.radius.md },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: tokens.radius.pill,
        minHeight: 44,
        padding: '10px 24px',
        boxShadow: 'none',
        '&:hover': { boxShadow: tokens.shadow.sm },
      },
      containedPrimary: {
        background: `linear-gradient(135deg, ${tokens.colors.primary} 0%, ${tokens.colors.secondary} 100%)`,
        '&:hover': { background: `linear-gradient(135deg, ${tokens.colors.primaryDark} 0%, ${tokens.colors.secondary} 100%)` },
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: tokens.radius.md,
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: tokens.colors.primary },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: tokens.colors.primary, borderWidth: 2 },
      },
    },
    MuiChip: {
      root: { borderRadius: tokens.radius.pill, fontWeight: 600 },
    },
    MuiCssBaseline: {
      '@global': {
        '*:focus-visible': {
          outline: `3px solid ${tokens.colors.primaryLight}`,
          outlineOffset: 2,
        },
      },
    },
  },
});

export default theme;
