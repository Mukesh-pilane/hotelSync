# Stage 1: Build stage
FROM node:14 AS build

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
# Ensure these files are available relative to the context
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code
COPY frontend/ .

# Build the frontend application
# Make sure this command generates the 'dist' folder
RUN npm run build

# Stage 2: Nginx stage
FROM nginx:alpine

# Copy the build output from the build stage to Nginx HTML folder
# Ensure the path matches the build output directory in the first stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80
