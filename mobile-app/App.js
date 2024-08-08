import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
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
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Register" 
          component={RegisterComponent} 
          options={{ title: 'Inscription' }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginComponent} 
          options={{ title: 'Connexion', headerLeft: null }} 
        />
        <Stack.Screen 
          name="ImagePicker" 
          component={ImagePickerComponent} 
          options={({ navigation }) => ({
            title: 'Prendre une Photo',
            headerLeft: null, // Disable back button
            headerRight: () => <LogoutButton navigation={navigation} />,
          })} 
        />
        <Stack.Screen 
          name="Prediction" 
          component={PredictionComponent} 
          options={({ navigation }) => ({
            title: 'Résultats de la Prédiction',
            headerRight: () => <LogoutButton navigation={navigation} />,
          })} 
        />
        <Stack.Screen 
          name="History" 
          component={HistoryComponent} 
          options={({ navigation }) => ({
            title: 'Historique des Analyses',
            headerRight: () => <LogoutButton navigation={navigation} />,
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}