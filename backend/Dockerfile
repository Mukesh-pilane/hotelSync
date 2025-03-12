# Use official Node.js image as base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files from the backend directory to the working directory inside the container
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy all backend application files to the working directory
COPY backend ./

# Expose the port the backend will run on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
