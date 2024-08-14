import React from 'react';
import { TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function LogoutButton({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login');
  };

  const confirmLogout = () => {
    Alert.alert(
      'Confirmation',
      'Voulez-vous vraiment vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { text: 'OK', onPress: handleLogout },
      ],
      { cancelable: false }
    );
  };

  return (
    <TouchableOpacity onPress={confirmLogout} style={styles.button}>
      <Ionicons name="log-out-outline" size={24} color="#333" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginRight: 20,
  },
});