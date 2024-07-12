import React, { useState } from 'react';
import { View, Button, Image, Text, StyleSheet, Platform, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ImagePickerComponent() {
  const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const userId = 1; // Remplacer par l'ID de l'utilisateur connecté

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = Platform.OS === 'web' ? result.assets[0].uri : result.assets[0].uri;
      setImage(uri);
      handlePrediction(uri);
    }
  };

  const handlePrediction = async (imageUri) => {
    if (!imageUri) {
      console.error("No image URI provided");
      return;
    }

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

    formData.append('user_id', userId);

    try {
      const response = await axios.post('http://192.168.1.164:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('API Response:', response.data); // Log de la réponse API
      setPrediction(response.data.prediction); // Stocker seulement l'objet prédiction
    } catch (error) {
      console.error("Error during prediction request: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      {prediction && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionTitle}>Prediction:</Text>
          <Text>Plant Type: {prediction.plant_type}</Text>
          <Text>Condition: {prediction.condition}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
  predictionContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  predictionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});