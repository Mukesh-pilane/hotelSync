# Use official Node.js image as base image for building the app
FROM node:14 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY frontend/package*.json ./

# Install frontend dependencies
RUN npm install

# Copy the source files for the frontend
COPY . .

# Build the frontend application
RUN npm run build

# Use Nginx to serve the frontend
FROM nginx:alpine

# Copy the built frontend from the build image to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 for the frontend
EXPOSE 80

# Start Nginx to serve the frontend
CMD ["nginx", "-g", "daemon off;"]
