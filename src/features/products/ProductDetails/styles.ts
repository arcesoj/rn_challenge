import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  container: {
    padding: 16,
    gap: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  desc: {
    color: '#444',
    lineHeight: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    width: 70,
    color: '#666',
  },
  value: {
    fontWeight: '600',
  },
  subtle: {
    color: '#666',
    marginTop: 8,
  },
  error: {
    color: '#b00020',
    fontWeight: '600',
  },
  link: {
    color: '#1e88e5',
    marginTop: 12,
  },
  reminderButton: {
    backgroundColor: '#1e88e5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  reminderText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
});

