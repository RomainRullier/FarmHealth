import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, Platform, Alert } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import { LinearGradient } from 'expo-linear-gradient';

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
        const response = await api.post('/predict', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          },
        });
        console.log('API Response:', response.data);
        setPrediction(response.data.prediction);
        setAnalysisId(response.data.analysis.id);
      } catch (error) {
        console.error("Error during prediction request: ", error);
      }
    };

    if (!initialAnalysisId && userId) {
      handlePrediction();
    } else if (initialAnalysisId && userId) {
      const fetchAnalysis = async () => {
        try {
          const token = await AsyncStorage.getItem('userToken');
          const response = await api.get(`/history/${userId}`, {
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
      await api.post(`/validate/${analysisId}`, {
        treatment_validated: true
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      Alert.alert('Succès', 'Traitement validé avec succès');
      setPrediction({ ...prediction, treatment_validated: true });
      navigation.navigate('ImagePicker', { refresh: true });
    } catch (error) {
      console.error("Error during validation request: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      {prediction && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionTitle}>Prédiction :</Text>
          <Text style={styles.predictionText}>Type de plante : {prediction.plant_type}</Text>
          <Text style={styles.predictionText}>Condition : {prediction.condition}</Text>
          {prediction.condition !== "saine" && !prediction.treatment_validated && (
            <>
              <TouchableOpacity onPress={handleValidation} style={styles.buttonContainer}>
                <LinearGradient
                  colors={['#43E97B', '#38F9D7']}
                  style={styles.button}
                  start={[0, 0]}
                  end={[1, 1]}
                >
                  <Text style={styles.buttonText}>Appliquer le traitement recommandé</Text>
                </LinearGradient>
              </TouchableOpacity>
              <Text style={styles.treatmentNotApplied}>Traitement non-appliqué</Text>
            </>
          )}
          {prediction.condition === "saine" && (
            <Text style={styles.noTreatment}>Aucun traitement recommandé</Text>
          )}
          {prediction.condition !== 'saine' && prediction.treatment_validated && (
            <Text style={styles.treatmentApplied}>Traitement appliqué</Text>
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 20,
    borderRadius: 10,
  },
  predictionContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  predictionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  predictionText: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333333',
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
  buttonContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});