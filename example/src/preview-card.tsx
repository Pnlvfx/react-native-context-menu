/* eslint-disable goat-eslint/no-inline-styles */
import { StyleSheet, Text, useColorScheme, View } from 'react-native';

export const PreviewCard = () => {
  const dark = useColorScheme() === 'dark';

  return (
    <View style={[card, { backgroundColor: dark ? '#1e1e1e' : '#ffffff' }]}>
      <Text style={[title, { color: dark ? '#ffffff' : '#0f0f0f' }]}>{'Custom preview'}</Text>
      <Text style={[body, { color: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.55)' }]}>{'Any React content can live here. Tap it to commit.'}</Text>
    </View>
  );
};

const { card, title, body } = StyleSheet.create({
  card: { width: 260, padding: 20, gap: 6 },
  title: { fontSize: 17, fontWeight: '700' },
  body: { fontSize: 14, lineHeight: 20 },
});
