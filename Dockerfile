# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first to take advantage of Docker's layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the application (if using TypeScript)
RUN npm run build

# Expose the application port (same as in your NestJS app)
EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
