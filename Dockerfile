# Use the official Node.js image as the base image
FROM node:23-alpine3.20

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Start the Next.js application
CMD ["npm", "start"]