# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY backend/package*.json ./

# Install any needed packages
RUN npm install

# Copy the rest of the backend code into the container
COPY . .

# Expose the port your backend will run on
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]
