import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

const { width } = Dimensions.get('window');

export default function HistoryComponent({ navigation, route }) {
  const [history, setHistory] = useState([]);
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
    if (userId) {
      fetchHistory();
    }
  }, [userId, route.params?.refresh]);

  const fetchHistory = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await api.get(`/history/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => navigation.navigate('Prediction', { imageUri: `${api.defaults.baseURL}${item.image_url}`, analysisId: item.id })}
    >
      <Image source={{ uri: `${api.defaults.baseURL}${item.image_url}` }} style={styles.image} />
      <Text style={styles.plantType}>Type: {item.plant_type}</Text>
      <Text style={styles.condition}>Condition: {item.condition}</Text>
      {item.condition !== 'healthy' && (
        <Text style={styles.treatment}>Traitement appliqué: {item.treatment_validated ? 'Oui' : 'Non'}</Text>
      )}
      <Text style={styles.date}>Date: {new Date(item.createdAt).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.historyTitle}>Historique des Plantes Analysées:</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyItem: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 125,
    height: 125,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#43E97B',
  },
  plantType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  condition: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 15,
  },
  treatment: {
    fontSize: 14,
    color: 'red',
    marginBottom: 10,
  },
  date: {
    fontSize: 12,
    color: '#999999',
  },
});