# mobile-app/Dockerfile

# Use official Node.js image as base image
FROM node:16

# Set working directory
WORKDIR /usr/src/app

# Install Expo CLI locally
RUN npm install -g expo-cli

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Expose the ports Expo uses
EXPOSE 8081 19000 19001 19002

# Set environment variable for Expo host
ENV REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.164

# Command to start the Expo project using npx and specify --lan
CMD ["npx", "expo", "start"]