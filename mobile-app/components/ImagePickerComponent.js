import React from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerComponent({ navigation }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = Platform.OS === 'web' ? result.assets[0].uri : result.assets[0].uri;
      navigation.navigate('Prediction', { imageUri: uri });
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      <Button title="Afficher l'historique" onPress={() => navigation.navigate('History')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
});