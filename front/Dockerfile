# Utiliser une image de base avec Node.js préinstallé
FROM node:20

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'application écoute
EXPOSE 3000

# Commande par défaut pour exécuter l'application lorsque le conteneur démarre
CMD [ "npm", "start" ]