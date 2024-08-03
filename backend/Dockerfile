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

# Copy the wait-for-it script
COPY wait-for-it.sh /wait-for-it.sh

# Make the wait-for-it script executable
RUN chmod +x /wait-for-it.sh

# Expose the port your app runs on
EXPOSE 5000

# Run the app using the wait-for-it script
CMD ["/wait-for-it.sh", "db:5432", "--", "node", "index.js"]