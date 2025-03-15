# Stage 1: Build the frontend
FROM node:19 as build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Add a line to check if the 'dist' directory exists
RUN ls -l /app/dist  # This will list the contents of the dist folder

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Copy the build output from the build stage to Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html  # Make sure this path is correct

# Expose the port
EXPOSE 80
