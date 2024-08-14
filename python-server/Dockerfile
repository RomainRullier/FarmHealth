# Utiliser une image officielle Python comme image de base
FROM python:3.9

# Définir le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copier requirements.txt dans le conteneur
COPY requirements.txt ./

# Installer les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copier le reste du code source dans le conteneur
COPY . .

# Exposer le port que l'application va utiliser
EXPOSE 5001

# Commande pour démarrer le serveur FastAPI
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5001"]