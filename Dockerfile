# Base image
FROM node:16

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:v1.40.1-jammy

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY package.json /app/
COPY tests/ /app/tests/
COPY playwright.config.ts /app/
COPY state.json /app/
COPY global-setup.ts /app/
COPY .env /app/
COPY pageElements/ /app/pageElements/

# Set the entry point for the container
CMD ["npx", "playwright", "test"]