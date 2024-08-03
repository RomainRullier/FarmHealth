# Utilisez une image officielle Python comme image de base
FROM python:3.9

# Définissez le répertoire de travail dans le conteneur
WORKDIR /usr/src/app

# Copiez requirements.txt dans le conteneur
COPY requirements.txt ./

# Installez les dépendances Python
RUN pip install --no-cache-dir -r requirements.txt

# Copiez le reste du code source dans le conteneur
COPY . .

# Exposez le port que l'application va utiliser
EXPOSE 5001

# Commande pour démarrer le serveur FastAPI
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5001"]