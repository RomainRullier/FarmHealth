# FarmHealth

FarmHealth est un projet de fin d'études visant à développer une application intelligente pour la détection des maladies des plantes en utilisant l'intelligence artificielle. L'application permet aux utilisateurs de prendre des photos de leurs plantes, d'analyser ces images pour détecter d'éventuelles maladies, et de recevoir des recommandations de traitement adaptées.

## Fonctionnalités

- **Détection des Maladies des Plantes** : Utilisation d'un modèle d'IA pré-entraîné pour identifier 38 classes différentes de maladies et d'états de santé des plantes.
- **Application Mobile** : Une application React Native pour prendre des photos de plantes et afficher les résultats des prédictions de manière intuitive.
- **Interface Utilisateur** : Une interface simple et conviviale pour la prise de photos et la consultation des résultats.
- **Stockage des Données** : Enregistrement des résultats de prédiction dans une base de données pour un suivi et une analyse ultérieure.
- **Système de Traitement Automatisé** : Intégration avec un système physique pour l'application automatique de traitements en fonction des résultats des prédictions.

## Technologies Utilisées

- **Front-End** : React Native pour une application mobile multiplateforme.
- **Back-End** : Node.js avec Express pour la gestion des API et la communication avec le modèle d'IA.
- **Modèle d'IA** : TensorFlow/PyTorch pour la détection des maladies des plantes.
- **Base de Données** : PostgreSQL/MySQL pour le stockage des résultats de prédiction.
- **Système de Contrôle** : Arduino/Raspberry Pi pour le contrôle physique des vannes de traitement.

## Installation et Utilisation

### Prérequis

- Node.js et npm/yarn installés
- Expo CLI pour le développement avec React Native
- Base de données relationnelle (PostgreSQL/MySQL)
- TensorFlow/PyTorch installé pour l'exécution du modèle d'IA

### Installation

1. **Cloner le dépôt :**

```bash
git clone https://github.com/your-username/FarmHealth.git
cd FarmHealth
```

2. **Installer les dépendances du front-end :**

```bash
cd mobile
npm install
```

3. **Installer les dépendances du back-end :**

```bash
cd ../backend
npm install
```

4. **Démarrer le serveur back-end :**

```bash
node index.js
```

5. **Démarrer l'application mobile :**

```bash
cd ../mobile
expo start
```
