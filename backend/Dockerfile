# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose the application port
EXPOSE 5000

# Run the application
CMD ["node", "app.js"]
