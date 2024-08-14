import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeComponent({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          <Text style={styles.titleBold}>Farm</Text>
          <Text style={styles.titleGreen}>Health</Text>
        </Text>
        <Text style={styles.subtitle}>Profitez de l'expérience.</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={require('../assets/images/illustration_1.png')} style={styles.image} />
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.buttonContainer}>
          <LinearGradient
            colors={['#43E97B', '#38F9D7']}
            style={styles.button}
            start={[0, 0]}
            end={[1, 1]}
          >
            <Text style={styles.buttonText}>Connexion</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  content: {
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    textAlign: 'center',
    color: '#333333',
  },
  titleBold: {
    fontWeight: 'bold',
  },
  titleGreen: {
    fontWeight: 'bold',
    color: '#43E97B',
  },
  subtitle: {
    fontSize: 18,
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 10,
  },
  image: {
    width: 250,
    height: 250,
  },
  buttonsContainer: {
    width: '100%',
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
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupButton: {
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#43E97B',
  },
  signupButtonText: {
    color: '#43E97B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});