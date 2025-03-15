# Use official Node.js image as base
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /frontend

# Copy package.json and package-lock.json for npm install
COPY frontend/package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy all the source files to the container
COPY . .

# Build the frontend project
RUN npm run build

# Expose the port your frontend will run on
EXPOSE 3000

# Command to run the frontend app
CMD ["npm", "run", "dev"]
