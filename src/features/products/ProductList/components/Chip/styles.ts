import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    marginRight: 8,
  },
  inactive: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  active: {
    backgroundColor: '#1e88e5',
    borderColor: '#1e88e5',
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    fontSize: 14,
  },
  textInactive: {
    color: '#333',
  },
  textActive: {
    color: '#fff',
    fontWeight: '600',
  },
});