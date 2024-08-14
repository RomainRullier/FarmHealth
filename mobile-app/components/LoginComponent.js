import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import api from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function LoginComponent({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isFocused, setIsFocused] = useState({ email: false, password: false });

  const handleLogin = async () => {
    try {
      const response = await api.post('/login', { email, password }, {
        timeout: 5000
      });
      const { token } = response.data;
      await AsyncStorage.setItem('userToken', token);
      navigation.navigate('ImagePicker');
    } catch (error) {
      setHasError(true);
      Alert.alert('Erreur de connexion', 'Email ou mot de passe incorrect.');
      console.error('Login error: ', error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Text style={styles.title}>Connexion</Text>
          <TextInput
            style={[
              styles.input,
              hasError && styles.inputError,
              isFocused.email && styles.inputFocused,
            ]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setIsFocused({ ...isFocused, email: true })}
            onBlur={() => setIsFocused({ ...isFocused, email: false })}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#A0A0A0"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.input,
                styles.passwordInput,
                hasError && styles.inputError,
                isFocused.password && styles.inputFocused,
              ]}
              placeholder="Mot de passe"
              value={password}
              onChangeText={setPassword}
              onFocus={() => setIsFocused({ ...isFocused, password: true })}
              onBlur={() => setIsFocused({ ...isFocused, password: false })}
              secureTextEntry={!showPassword}
              placeholderTextColor="#A0A0A0"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#A0A0A0" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={handleLogin} style={styles.buttonContainer}>
            <LinearGradient
              colors={['#43E97B', '#38F9D7']}
              style={styles.button}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Text style={styles.buttonText}>Se connecter</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.registerContainer}>
            <Text style={styles.registerText}>S'inscrire</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#FFFFFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    color: '#333333',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputFocused: {
    borderColor: '#43E97B',
    borderWidth: 1,
    shadowColor: '#43E97B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  inputError: {
    borderColor: '#FF5A5F',
    borderWidth: 1,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordInput: {
    paddingRight: 40,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    alignItems: 'center',
  },
  registerText: {
    color: '#A0A0A0',
    fontSize: 16,
  },
});