# Use the official Node.js image.
FROM node:18

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy the application code to the container image.
COPY . .

# Run the web service on container startup.
CMD [ "npm", "start" ]

# Inform Docker that the container listens on port 8080.
EXPOSE 8080
