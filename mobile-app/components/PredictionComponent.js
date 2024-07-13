import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, Platform } from 'react-native';
import axios from 'axios';

export default function PredictionComponent({ route, navigation }) {
  const { imageUri } = route.params;
  const [prediction, setPrediction] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  const userId = 1; // Remplacer par l'ID de l'utilisateur connecté

  useEffect(() => {
    const handlePrediction = async () => {
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
        setAnalysisId(response.data.analysis.id); // Stocker l'ID de l'analyse courante
      } catch (error) {
        console.error("Error during prediction request: ", error);
      }
    };

    handlePrediction();
  }, [imageUri]);

  const handleValidation = async () => {
    try {
      if (!analysisId) {
        console.error("No analysis ID provided");
        return;
      }

      await axios.post(`http://192.168.1.164:5000/validate/${analysisId}`, {
        treatment_validated: true
      });

      alert('Traitement validé avec succès');
      navigation.navigate('History'); // Naviguer vers l'historique après validation
    } catch (error) {
      console.error("Error during validation request: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      {prediction && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionTitle}>Prediction:</Text>
          <Text>Plant Type: {prediction.plant_type}</Text>
          <Text>Condition: {prediction.condition}</Text>
          <Button title="Valider le traitement" onPress={handleValidation} />
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