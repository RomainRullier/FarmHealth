# FarmHealth

FarmHealth est un projet de fin d'études visant à développer une application intelligente pour la détection des maladies des plantes en utilisant l'intelligence artificielle. L'application permet aux utilisateurs de prendre des photos de leurs plantes, d'analyser ces images pour détecter d'éventuelles maladies, et de recevoir des recommandations de traitement adaptées.

## Fonctionnalités

- **Détection des Maladies des Plantes** : Utilisation d'un modèle d'IA pré-entraîné pour identifier 38 classes différentes de maladies et d'états de santé des plantes.
- **Application Mobile et Web** : Une application React Native pour prendre des photos de plantes et afficher les résultats des prédictions de manière intuitive.
- **Interface Utilisateur** : Une interface simple et conviviale pour la prise de photos, la validation des traitements, et la consultation de l'historique.
- **Stockage des Données** : Enregistrement des résultats de prédiction dans une base de données pour un suivi et une analyse ultérieure.
- **Authentification des Utilisateurs** : Gestion des utilisateurs avec des fonctionnalités d'inscription et de connexion pour un suivi personnalisé des analyses de plantes.
- **Envoi des Données au Raspberry Pi** : Transmission des données de traitement validées à un Raspberry Pi pour le contrôle des vannes.

## Technologies Utilisées

- **Front-End** : React Native pour une application mobile multiplateforme et une interface web.
- **Back-End** : Node.js avec Express pour la gestion des API et la communication avec le modèle d'IA.
- **Modèle d'IA** : TensorFlow Lite pour la détection des maladies des plantes.
- **Base de Données** : PostgreSQL pour le stockage des résultats de prédiction.
- **Authentification** : JSON Web Tokens (JWT) pour la gestion sécurisée des sessions utilisateur.
- **Système de Contrôle** : Raspberry Pi pour le contrôle physique des vannes de traitement.

## Installation et Utilisation

### Prérequis

- Node.js et npm installés
- Expo CLI pour le développement avec React Native
- Expo Go installé sur votre téléphone (disponible sur [App Store](https://apps.apple.com/app/expo-go/id982107779) et [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent))
- Raspberry Pi pour le contrôle des vannes

### Installation

1. **Cloner le dépôt :**

```bash
git clone https://github.com/RomainRullier/FarmHealth.git
cd FarmHealth
```

2. **Installer les dépendances du front-end :**

```bash
cd mobile-app
npm install
```

3. **Démarrer l'application mobile :**

```bash
cd mobile-app
npx expo start
```

### Utilisation

1. **Scanner le QR Code :**

- Après avoir démarré l'application avec 'npx expo start', un QR code sera affiché dans le terminal.
- Scannez le QR code avec Expo Go sur votre téléphone pour lancer l'application mobile.

2. **Prendre une Photo :**

- Utilisez l'application pour prendre une photo de la plante à analyser.

3. **Recevoir les Résultats :**

- L'application affichera les résultats de la prédiction avec les informations sur l'état de la plante.

4. **Valider un traitement :**

- Si la plante est malade, vous pouvez valider le traitement recommandé directement depuis l'application.
- Les données de traitement validées seront envoyées au Raspberry Pi pour le contrôle des vannes.

5. **Consulter l'historique :**

- Consultez l'historique des plantes analysés afin de suivre l'évolution de leur état de santé.