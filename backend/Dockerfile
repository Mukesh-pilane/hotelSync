# Stage 1: Use Node.js base image
FROM node:14 AS build

# Set working directory for the backend app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependencies
COPY backend/package*.json ./

# Install dependencies for the backend
RUN npm install

# Copy the entire backend app code to the container (use the correct path)
COPY ./backend/

# Expose the backend port
EXPOSE 3000

# Command to run the backend app
CMD ["npm", "start"]
