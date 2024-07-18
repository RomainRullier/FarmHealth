import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

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
      const response = await axios.get(`http://192.168.1.164:5000/history/${userId}`, {
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
      onPress={() => navigation.navigate('Prediction', { imageUri: `http://192.168.1.164:5000${item.image_url}`, analysisId: item.id })}
    >
      <Image source={{ uri: `http://192.168.1.164:5000${item.image_url}` }} style={styles.image} />
      <Text>Plant Type: {item.plant_type}</Text>
      <Text>Condition: {item.condition}</Text>
      {item.condition !== 'healthy' && (
        <Text>Traitement appliqué: {item.treatment_validated ? 'Oui' : 'Non'}</Text>
      )}
      <Text>Date: {new Date(item.createdAt).toLocaleString()}</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  list: {
    width: '100%',
    alignItems: 'center',
  },
  historyItem: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});