import React from 'react';
import { StyleSheet, View } from 'react-native';
import ImagePickerComponent from './components/ImagePickerComponent';

export default function App() {
  return (
    <View style={styles.container}>
      <ImagePickerComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});