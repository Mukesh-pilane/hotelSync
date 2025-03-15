# Stage 1: Build the frontend
FROM node:19 as build

WORKDIR /app

# Copy package files and install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy the source files and build the frontend
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Create the necessary directory structure if it doesn't exist
RUN mkdir -p /usr/share/nginx/html

# Copy the build output from the build stage to Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose the port
EXPOSE 80
