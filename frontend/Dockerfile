# Use an official Node.js image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Install dependencies
COPY frontend/package*.json ./

# Install any needed packages
RUN npm install

# Copy the frontend source files
COPY frontend/ .

# Build the frontend
RUN npm run build

# Expose the port for frontend
EXPOSE 3000

# Run the frontend app (if using a production build)
CMD ["npm", "start"]
