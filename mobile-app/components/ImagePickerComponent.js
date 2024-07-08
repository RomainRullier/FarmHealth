import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ImagePickerComponent() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log("ImagePicker result: ", result);

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      console.log("Selected image URI: ", uri);
      setImage(uri);
      handlePrediction(uri);
    } else {
      console.error("No image selected or assets not available");
    }
  };

  const handlePrediction = async (imageUri) => {
    if (!imageUri) {
      console.error("No image URI provided");
      return;
    }

    console.log("Handling prediction for URI: ", imageUri);

    let filename = imageUri.split('/').pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    if (Platform.OS === 'web') {
      // Convertir l'URI en Blob pour le web
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();
        formData.append('image', blob, filename);
      } catch (error) {
        console.error("Error fetching and converting image to blob: ", error);
        return;
      }
    } else {
      formData.append('image', {
        uri: imageUri,
        type: type,
        name: filename,
      });
    }

    try {
      const response = await axios.post('http://192.168.1.164:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.predicted_class);
    } catch (error) {
      console.error("Error during prediction request: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {prediction && <Text style={styles.prediction}>Prediction: {prediction}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  prediction: {
    marginTop: 20,
    fontSize: 18,
  },
});