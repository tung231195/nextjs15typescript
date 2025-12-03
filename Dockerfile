# Base image
FROM node:20

# Set working directory
WORKDIR /nextjs15-final

# Copy package.json & package-lock.json first
COPY package*.json ./

# Install dependencies (including devDependencies)
RUN npm install

# Copy the rest of the code
COPY . .

# Expose port
EXPOSE 3000

# Use nodemon or next dev for hot reload
CMD ["npm", "run", "dev"]
