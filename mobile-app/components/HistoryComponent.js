import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function HistoryComponent({ navigation }) {
  const [history, setHistory] = useState([]);
  const userId = 1; // Remplacer par l'ID de l'utilisateur connecté

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`http://192.168.1.164:5000/history/${userId}`);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching history: ", error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => navigation.navigate('Prediction', { imageUri: `http://192.168.1.164:5000${item.image_url}` })}
    >
      <Text>Plant Type: {item.plant_type}</Text>
      <Text>Condition: {item.condition}</Text>
      <Text>Traitement Validé: {item.treatment_validated ? 'Oui' : 'Non'}</Text>
      <Text>Date: {new Date(item.createdAt).toLocaleString()}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.historyTitle}>Historique des Plantes Analysées:</Text>
      <FlatList
        data={history}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
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
  listContent: {
    alignItems: 'center',
  },
  historyItem: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '90%',
    alignItems: 'center',
  },
});