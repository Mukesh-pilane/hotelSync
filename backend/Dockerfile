# Use official Node.js image as base image
FROM node:14

# Set the working directory inside the container to /usr/src/app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all the application files to the working directory
COPY . .

# Expose the port that the backend will run on
EXPOSE 3000

# Run the application
CMD ["npm", "start"]
