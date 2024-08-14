import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import WelcomeComponent from './components/WelcomeComponent';
import RegisterComponent from './components/RegisterComponent';
import LoginComponent from './components/LoginComponent';
import ImagePickerComponent from './components/ImagePickerComponent';
import PredictionComponent from './components/PredictionComponent';
import HistoryComponent from './components/HistoryComponent';
import LogoutButton from './components/LogoutButton';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeComponent} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterComponent} 
          options={({ navigation }) => ({
            title: 'Inscription',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={24} color="#333" />
                <Text style={styles.backButtonText}>Retour</Text>
              </TouchableOpacity>
            ),
          })} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginComponent} 
          options={({ navigation }) => ({
            title: 'Connexion',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={24} color="#333" />
                <Text style={styles.backButtonText}>Retour</Text>
              </TouchableOpacity>
            ),
          })} 
        />
        <Stack.Screen 
          name="ImagePicker" 
          component={ImagePickerComponent} 
          options={({ navigation }) => ({
            title: 'Prendre une Photo',
            headerLeft: null,
            headerRight: () => <LogoutButton navigation={navigation} />,
          })} 
        />
        <Stack.Screen 
          name="Prediction" 
          component={PredictionComponent} 
          options={({ navigation }) => ({
            title: 'Résultats de la Prédiction',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={24} color="#333" />
                <Text style={styles.backButtonText}>Retour</Text>
              </TouchableOpacity>
            ),
            headerRight: () => <LogoutButton navigation={navigation} />,
          })} 
        />
        <Stack.Screen 
          name="History" 
          component={HistoryComponent} 
          options={({ navigation }) => ({
            title: 'Historique des Analyses',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back-outline" size={24} color="#333" />
                <Text style={styles.backButtonText}>Retour</Text>
              </TouchableOpacity>
            ),
            headerRight: () => <LogoutButton navigation={navigation} />,
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
  },
  backButtonText: {
    marginLeft: 5,
    fontSize: 16,
    color: '#333',
  },
});