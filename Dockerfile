# Use Node.js base image
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Build TypeScript
RUN npm run build

# Start the app with tsconfig-paths
CMD ["node", "-r", "tsconfig-paths/register", "./dist/app.js"]
