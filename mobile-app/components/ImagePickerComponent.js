import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ImagePickerComponent({ navigation }) {
  useEffect(() => {
    (async () => {
      const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
      const { status: mediaLibraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (cameraStatus !== 'granted' || mediaLibraryStatus !== 'granted') {
        Alert.alert(
          "Permissions requises",
          "L'application a besoin des permissions pour accéder à la caméra et à la galerie de photos.",
          [{ text: "OK" }]
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = Platform.OS === 'web' ? result.assets[0].uri : result.assets[0].uri;
      navigation.navigate('Prediction', { imageUri: uri });
    }
  };

  const takePhoto = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();

    if (cameraStatus === 'granted') {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const uri = Platform.OS === 'web' ? result.assets[0].uri : result.assets[0].uri;
        navigation.navigate('Prediction', { imageUri: uri });
      }
    } else {
      Alert.alert(
        "Permission refusée",
        "Vous devez accorder la permission pour accéder à la caméra.",
        [{ text: "OK" }]
      );
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={takePhoto} style={styles.buttonContainer}>
        <LinearGradient
          colors={['#43E97B', '#38F9D7']}
          style={styles.button}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Ionicons name="camera-outline" size={24} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>Prendre une photo</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickImage} style={styles.buttonContainer}>
        <LinearGradient
          colors={['#43E97B', '#38F9D7']}
          style={styles.button}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Ionicons name="image-outline" size={24} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>Choisir une image de la galerie</Text>
        </LinearGradient>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('History')} style={styles.buttonContainer}>
        <LinearGradient
          colors={['#43E97B', '#38F9D7']}
          style={styles.button}
          start={[0, 0]}
          end={[1, 1]}
        >
          <Ionicons name="time-outline" size={24} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.buttonText}>Afficher l'historique</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  button: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 10,
  },
});