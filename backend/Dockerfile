# Stage 1: Use Node.js base image
FROM node:14 AS build

# Set working directory for the backend app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json for dependencies
COPY ./package*.json ./  # Use this because you're copying from the root directory

# Install dependencies for the backend
RUN npm install

# Copy the entire backend app code to the container
COPY ./backend/. ./  # Use this to copy everything inside ./backend to the container's working directory

# Expose the backend port
EXPOSE 3000

# Command to run the backend app
CMD ["npm", "start"]
