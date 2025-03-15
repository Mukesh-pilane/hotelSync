# Use the official Node.js image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to install dependencies
COPY backend/package*.json ./  # Correctly copy from the root, not from backend/ folder

# Install backend dependencies
RUN npm install

# Copy the rest of the backend files
COPY . /usr/src/app  # This copies everything from the build context (./backend) into the container

# Expose the backend application port (adjust as necessary, e.g., 5000)
EXPOSE 5000

# Command to run your backend (adjust if necessary)
CMD ["npm", "start"]
