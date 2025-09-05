import React from 'react';
import { Pressable, Text } from 'react-native';
import { styles } from './styles';

type ChipProps = { label: string; active?: boolean; onPress: () => void };

export const Chip = React.memo(function Chip({ label, active, onPress }: ChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        active ? styles.active : styles.inactive,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, active ? styles.textActive : styles.textInactive]}>
        {label}
      </Text>
    </Pressable>
  );
});

