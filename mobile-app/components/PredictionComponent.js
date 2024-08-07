import React, { useState, useEffect } from 'react';
import { View, Image, Text, Button, StyleSheet, ScrollView, Platform } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

export default function PredictionComponent({ route, navigation }) {
  const { imageUri, analysisId: initialAnalysisId } = route.params;
  const [prediction, setPrediction] = useState(null);
  const [analysisId, setAnalysisId] = useState(initialAnalysisId || null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.userId);
      }
    };

    fetchUserId();
  }, []);

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

      try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await axios.post('http://20.107.136.225:5000/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });
        console.log('API Response:', response.data); // Log de la réponse API
        setPrediction(response.data.prediction); // Stocker seulement l'objet prédiction
        setAnalysisId(response.data.analysis.id); // Stocker l'ID de l'analyse courante
      } catch (error) {
        console.error("Error during prediction request: ", error);
      }
    };

    if (!initialAnalysisId && userId) {
      handlePrediction();
    } else if (initialAnalysisId && userId) {
      // Fetch existing analysis data
      const fetchAnalysis = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          const response = await axios.get(`http://20.107.136.225:5000/history/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const analysis = response.data.find(item => item.id === initialAnalysisId);
          if (analysis) {
            setPrediction({
              plant_type: analysis.plant_type,
              condition: analysis.condition,
              treatment_validated: analysis.treatment_validated
            });
          }
        } catch (error) {
          console.error("Error fetching analysis data: ", error);
        }
      };

      fetchAnalysis();
    }
  }, [imageUri, initialAnalysisId, userId]);

  const handleValidation = async () => {
    try {
      if (!analysisId) {
        console.error("No analysis ID provided");
        return;
      }

      const token = await AsyncStorage.getItem('userToken');
      await axios.post(`http://20.107.136.225:5000/validate/${analysisId}`, {
        treatment_validated: true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      alert('Traitement validé avec succès');
      // Mise à jour de l'état de la prédiction pour refléter la validation du traitement
      setPrediction({ ...prediction, treatment_validated: true });
      navigation.navigate('ImagePicker', { refresh: true }); // Naviguer vers l'historique après validation et rafraîchir
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
          {prediction && prediction.condition !== "healthy" && !prediction.treatment_validated && (
            <>
              <Button title="Appliquer le traitement recommandé" onPress={handleValidation} />
              <Text style={styles.treatmentNotApplied}>Traitement non-appliqué</Text>
            </>
          )}
          {prediction.condition === "healthy" && (
            <Text style={styles.noTreatment}>Aucun traitement recommandé</Text>
          )}
          {prediction && prediction.condition !== 'healthy' && prediction.treatment_validated && (
            <Text style={styles.treatmentApplied}>Traitement appliqué</Text>
          )}
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
  noTreatment: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  treatmentApplied: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  treatmentNotApplied: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'red',
  },
});