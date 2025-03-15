# Use official Node.js image as base
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json first
COPY frontend/package*.json ./

# Copy all the source files to the container
COPY . .

# Expose the port your frontend will run on
EXPOSE 3000

# Command to run the frontend app (for development)
CMD ["npm", "run", "dev"]
