import React from 'react';
import { Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutButton({ navigation }) {
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.navigate('Login'); // Navigate to login screen after logout
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

  return <Button title="Déconnexion" onPress={confirmLogout} />;
}