import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePickerComponent from './components/ImagePickerComponent';
import PredictionComponent from './components/PredictionComponent';
import HistoryComponent from './components/HistoryComponent';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ImagePicker">
        <Stack.Screen name="ImagePicker" component={ImagePickerComponent} options={{ title: 'Prendre une Photo' }} />
        <Stack.Screen name="Prediction" component={PredictionComponent} options={{ title: 'Résultats de la Prédiction' }} />
        <Stack.Screen name="History" component={HistoryComponent} options={{ title: 'Historique des Analyses' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}