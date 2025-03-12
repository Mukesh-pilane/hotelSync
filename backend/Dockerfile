FROM node:14

WORKDIR /usr/src/app

# Copy the package.json and package-lock.json into the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the app
CMD ["npm", "start"]
