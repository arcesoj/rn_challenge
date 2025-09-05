import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
    gap: 12,
  },
  thumb: {
    width: 64,
    height: 64,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  meta: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    marginTop: 4,
    color: '#1e88e5',
  },
});