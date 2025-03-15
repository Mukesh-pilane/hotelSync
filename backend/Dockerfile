# Use Node.js 16 as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /usr/src/app

# Make sure the destination directory exists
RUN mkdir -p /usr/src/app

# Copy the package.json files from the backend folder
COPY backend/package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of the backend code (adjust the path as necessary)
COPY backend/ .

# Expose the port your backend will run on
EXPOSE 3000

# Run your backend (adjust if necessary)
CMD ["npm", "start"]
