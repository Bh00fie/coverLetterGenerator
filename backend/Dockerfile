# Use the official Node.js image.
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm ci --omit=dev

# Copy the application code to the container image.
COPY . .

ENV NODE_ENV=production
# Cloud Run and most hosts override PORT; default to 8080 inside the container.
ENV PORT=8080
EXPOSE 8080

# Run the web service on container startup.
CMD [ "node", "index.js" ]
