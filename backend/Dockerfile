# backend/Dockerfile

# Use official Node.js image as base image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Expose the port your app runs on
EXPOSE 5000

# Run the app using the wait-for-it script
CMD ["node", "index.js"]