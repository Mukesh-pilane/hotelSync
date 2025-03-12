# Stage 1: Build stage
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code
COPY . .

# Build the frontend application
RUN npm run build   # Make sure this command generates the 'dist' folder

# Stage 2: Nginx stage
FROM nginx:alpine

# Copy the build output from the build stage to Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80
