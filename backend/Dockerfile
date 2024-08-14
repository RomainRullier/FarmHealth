# Utiliser une image officielle Node.js comme image de base
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier package.json et package-lock.json dans le conteneur
COPY package*.json ./

# Installer les dépendances Node.js
RUN npm install

# Copier le reste du code source dans le conteneur
COPY . .

# Exposez le port que l'application va utiliser
EXPOSE 5000

# Commande pour démarrer le serveur Express
CMD ["node", "index.js"]