export const lightTheme = {
  colors: {
    background: '#F8FAFC',
    card: '#FFFFFF',
    text: '#111827',
    mutedText: '#6B7280',
    primary: '#2563EB',
    primarySoft: '#DBEAFE',
    border: '#E5E7EB',
    danger: '#DC2626',
    success: '#16A34A',
    warning: '#F59E0B',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    title: 28,
    subtitle: 20,
    body: 16,
    small: 14,
    caption: 12,
  },
};

export const darkTheme = {
  colors: {
    background: '#020617',
    card: '#0F172A',
    text: '#F8FAFC',
    mutedText: '#94A3B8',
    primary: '#60A5FA',
    primarySoft: '#1E3A8A',
    border: '#1E293B',
    danger: '#F87171',
    success: '#4ADE80',
    warning: '#FBBF24',
  },
  spacing: lightTheme.spacing,
  typography: lightTheme.typography,
};

export type AppTheme = typeof lightTheme;