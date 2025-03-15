# Use official Node.js image as base
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /frontend

# Install dependencies
COPY frontend/package*.json ./
RUN npm install

# Copy all the source files to the container
COPY . .

# Build the frontend project
RUN npm run build

# Expose the port your frontend will run on
EXPOSE 3000

# Command to run the frontend app
CMD ["npm", "run", "dev"]
